import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import RecoveryPasswordMail from '../jobs/recovery-password-mail';
import CreationConfirmationMail from '../jobs/creation-confirmation-mail';
import Queue from '../lib/queue';
import UsersModel from '../models/users';
import PasswordHasher from '../services/password-hasher';
import redis from '../database/redis';

require('express-async-errors');

class Users {
  async login(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .strict(true)
        .min(8, 'Password should be 8 characters least'),
    });

    await schema.validate(req.body);

    const { email, password: providedPassword } = req.body;

    const user = await UsersModel.findOne({ email });
    if (user) {
      const { id, name, password: storedPassword, active, role } = user;

      if (active) {
        if (!(await PasswordHasher.compare(providedPassword, storedPassword))) {
          return res
            .status(401)
            .json({ error: 'Username or password is incorret' });
        }
        return res.status(200).json({
          user: {
            id,
            name,
            email,
          },
          token: jwt.sign({ id, role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
          }),
        });
      }
      return res.status(403).json({ error: 'User blocked' });
    }
    return res.status(401).json({ error: 'Username or password is incorret' });
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email()
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
      passwordConfirmation: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords should match'),
    });

    await schema.validate(req.body);

    const { name, email, password } = req.body;
    const user = await UsersModel.findOne({ email });

    if (!user) {
      const hashedPassword = await PasswordHasher.hash(password);
      const confirmationToken = crypto.randomBytes(8).toString('hex');
      const saved_user = await UsersModel.insert(
        ['id', 'name', 'email', 'role'],
        {
          name,
          email,
          password: hashedPassword,
          confirmationToken,
        }
      );
      await Queue.add(CreationConfirmationMail.key, {
        name,
        email,
        confirmationToken,
      });

      return res.status(201).json(...saved_user);
    }
    return res.status(400).json({ error: 'User already exists' });
  }

  async forgotPassword(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Email is required'),
    });

    await schema.validate(req.body);
    const { email } = req.body;

    const user = await UsersModel.findOne({ email });

    if (user) {
      const resetToken = crypto.randomBytes(8).toString('hex');
      await UsersModel.update(['name'], { email }, { resetToken });
      await Queue.add(RecoveryPasswordMail.key, {
        name: user.name,
        email,
        resetToken,
      });
    }
    return res.sendStatus(204);
  }

  async resetPassword(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().required('Password is required'),
      passwordConfirmation: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords should match'),
    });
    const schema2 = Yup.object().shape({
      reset_token: Yup.string()
        .required('Token não informado')
        .length(16, 'Token inválido'),
    });

    await schema.validate(req.body);
    await schema2.validate(req.query);

    const { reset_token } = req.query;
    const user = await UsersModel.findOne({ reset_token });

    let { password } = req.body;
    password = await PasswordHasher.hash(password);

    await UsersModel.update(
      ['*'],
      { id: user.id },
      { password, reset_token: null }
    );

    return res.sendStatus(204);
  }

  async creationConfirmation(req, res) {
    const schema = Yup.object().shape({
      confirmation_token: Yup.string()
        .required()
        .strict()
        .length(16, 'Invalid confirmation token'),
    });
    await schema.validate(req.query);
    const { confirmation_token } = req.query;

    await UsersModel.update(
      ['id'],
      { confirmation_token },
      { active: true, confirmation_token: null }
    );

    return res.sendStatus(204);
  }

  async logout(req, res) {
    const todayInSeconds = Math.floor(new Date().getTime() / 1000);
    const timeToExpire = +req.tokenExpiration - todayInSeconds;
    await redis.setAsync(req.token, true, 'EX', timeToExpire);

    return res.sendStatus(204);
  }
}

export default new Users();
