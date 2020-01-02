import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import RecoveryPasswordMail from '../jobs/RecoveryPasswordMail';
import CreationConfirmationMail from '../jobs/CreationConfirmationMail';
import Queue from '../lib/Queue';
import UsersModel from '../models/Users';
import PasswordHasher from '../services/password_hasher';

const ONE_YEAR_JWT = '365d';
class Users {
  async login(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Email é obrigatório.'),
      password: Yup.string().required('Senha é obrigatória.'),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const { email, password: provided_password } = req.body;

    const user = await UsersModel.find({ email });
    if (Array.isArray(user) && user.length) {
      const { id, name, password: stored_password, active, role } = user[0];

      if (active) {
        if (
          !(await PasswordHasher.compare(provided_password, stored_password))
        ) {
          return res
            .status(401)
            .json({ error: 'Usuário e/ou senha incorretos.' });
        }
        return res.status(200).json({
          user: {
            id,
            name,
            email,
          },
          token: jwt.sign({ id, role }, process.env.JWT_SECRET, {
            expiresIn: ONE_YEAR_JWT,
          }),
        });
      }
      return res.status(403).json({ error: 'Usuário bloqueado.' });
    }
    return res.status(401).json({ error: 'Usuário e/ou senha incorretos.' });
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório.'),
      email: Yup.string()
        .email()
        .required('Email é obrigatório.'),
      password: Yup.string().required('Senha é obrigatória.'),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'As senhas devem coincidir.'),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    // eslint-disable-next-line prefer-const
    let { name, email, password } = req.body;
    let user;
    try {
      user = await UsersModel.find({ email });
    } catch (e) {
      return res.status(503).json({
        error: 'Não foi possível estabelecer uma conexão com o banco de dados.',
      });
    }

    if (Array.isArray(user) && !user.length) {
      password = await PasswordHasher.hash(password);
      const confirmation_token = crypto.randomBytes(8).toString('hex');
      const saved_user = await UsersModel.insert(['id', 'name', 'email'], {
        name,
        email,
        password,
        confirmation_token,
      });
      await Queue.add(CreationConfirmationMail.key, {
        name,
        email,
        confirmation_token,
      });

      return res.status(200).json(...saved_user);
    }
    return res.status(400).json({ error: 'Usuário já cadastrado.' });
  }

  async forgot_password(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Email é obrigatório.'),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }
    const { email } = req.body;

    const user = await UsersModel.find({ email });

    if (Array.isArray(user) && user.length) {
      const reset_token = crypto.randomBytes(8).toString('hex');
      try {
        const name = await UsersModel.update(
          ['name'],
          { email },
          { reset_token }
        );
        await Queue.add(RecoveryPasswordMail.key, { name, email, reset_token });
      } catch (e) {
        return res.status(503).json({
          message: 'Falha ao gerar link de redefinição de senha.',
          error: e,
        });
      }
    }
    return res.sendStatus(204);
  }

  async reset_password(req, res) {
    let user;
    const schema = Yup.object().shape({
      password: Yup.string().required('Senha é obrigatória.'),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'As senhas devem coincidir.'),
    });
    const schema2 = Yup.object().shape({
      reset_token: Yup.string()
        .required('Token não informado')
        .length(16, 'Token inválido'),
    });

    try {
      await schema.validate(req.body);
      await schema2.validate(req.query);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }
    const { reset_token } = req.query;
    try {
      user = await UsersModel.find({ reset_token });
    } catch (e) {
      return res
        .status(400)
        .json({ message: 'Falha ao redefinir senha.', error: e });
    }

    let { password } = req.body;
    password = await PasswordHasher.hash(password);

    try {
      await UsersModel.update(
        ['*'],
        { id: user[0].id },
        { password, reset_token: null }
      );
      return res.status(200).json({ message: 'Senha alterada com sucesso!' });
    } catch (e) {
      return res
        .status(400)
        .json({ message: 'Falha ao redefinir senha.', error: e });
    }
  }

  async creation_confirmation(req, res) {
    const schema = Yup.object().shape({
      confirmation_token: Yup.string()
        .required('Token não informado')
        .length(16, 'Token inválido'),
    });

    try {
      await schema.validate(req.query);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const { confirmation_token } = req.query;

    try {
      await UsersModel.update(
        ['id'],
        { confirmation_token },
        { active: true, confirmation_token: null }
      );
      return res.sendStatus(204);
    } catch (e) {
      return res
        .status(503)
        .json({ message: 'Falha ao ativar conta.', error: e });
    }
  }
}

export default new Users();
