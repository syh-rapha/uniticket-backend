import * as Yup from 'yup';
import UsersModel from '../models/users';
import TransactionsModel from '../models/transactions';

class Transactions {
  async acquireCredits(req, res) {
    const schema = Yup.object().shape({
      creditsQuantity: Yup.number()
        .moreThan(0)
        .max(50)
        .required('Credits quantity should be between 0 and 50'),
    });

    await schema.validate(req.body);
    const { creditsQuantity } = req.body;

    // TODO: definir como transaction e verificar creditos como array
    const credits = await UsersModel.increment(
      'credits',
      { id: req.userId },
      { credits: creditsQuantity }
    );
    await TransactionsModel.insert(['*'], {
      type: 'acquire_credits',
      user_id: req.userId,
    });

    return res.status(200).json({
      credits: credits[0],
    });
  }
}

export default new Transactions();
