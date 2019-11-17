import * as Yup from 'yup';
import UsersModel from '../models/Users';
import TransactionsModel from '../models/Transactions';

class Transactions {
  async adquirir_creditos(req, res) {
    const schema = Yup.object().shape({
      qtdCreditos: Yup.number()
        .moreThan(0)
        .required('Quantidade de créditos deve ser maior que 0.'),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const { qtdCreditos } = req.body;

    try {
      const creditos = await UsersModel.increment(
        'creditos',
        { id: req.userId },
        { creditos: qtdCreditos }
      );
      await TransactionsModel.insert(['*'], {
        type: 'adquirir_credito',
        user_id: req.userId,
      });
      return res.status(200).json({
        message: 'Créditos adquiridos com sucesso.',
        creditos: creditos[0],
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Falha ao adquirir créditos.', error: e });
    }
  }
}

export default new Transactions();
