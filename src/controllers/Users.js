import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

class Users {
  async login(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Senha e/ou email não foram preenchidos' });
    }

    const { email, password } = req.body;

    const user = { email: 'ra98336@uem.com', password: 123, id: 1 }; // substituir por query

    if (!user) {
      return res.status(401).json({ error: 'Usuário e/ou senha incorretos.' });
    }

    // if (!(await user.checkPassword(password))) {
    //   return res.status(401).json({ error: 'Usuário e/ou senha incorretos.' });
    // }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      }),
    });
  }
}

export default new Users();
