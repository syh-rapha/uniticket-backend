import Mail from '../lib/Mail';

class CreationConfirmationMail {
  get key() {
    return 'CreationConfirmationMail';
  }

  async handle({ data }) {
    const { name, email, confirmation_token } = data;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Confirmação de Cadastro',
      template: 'confirm_creation',
      context: {
        username: name,
        confirmation_url: `${process.env.APP_URL}/users/creation_confirmation/${confirmation_token}`,
      },
    });
  }
}

export default new CreationConfirmationMail();
