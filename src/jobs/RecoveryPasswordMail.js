import Mail from '../lib/Mail';

class RecoveryPasswordMail {
  get key() {
    return 'RecoveryPasswordMail';
  }

  async handle({ data }) {
    const { name, email, reset_token } = data;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Redefinição de Senha',
      template: 'reset_password',
      context: {
        username: name,
        confirmation_url: `${process.env.APP_URL}/users/reset_password/${reset_token}`,
      },
    });
  }
}

export default new RecoveryPasswordMail();
