import Mail from '../lib/mail';

class CreationConfirmationMail {
  get key() {
    return 'CreationConfirmationMail';
  }

  async handle({ data }) {
    const { name, email, confirmationToken } = data;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Confirmação de Cadastro',
      template: 'creation-confirmation',
      context: {
        name,
        confirmationUrl: `${process.env.FRONTEND_URL}/confirmacao-criacao?confirmation_token=${confirmationToken}`,
      },
    });
  }
}

export default new CreationConfirmationMail();
