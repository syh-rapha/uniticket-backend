import Mail from '../lib/mail';

class RecoveryPasswordMail {
  get key() {
    return 'RecoveryPasswordMail';
  }

  async handle({ data }) {
    const { name, email, resetToken } = data;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Redefinição de Senha',
      template: 'reset-password',
      context: {
        name,
        resetUrl: `${process.env.FRONTEND_URL}/redefinir-senha?reset_token=${resetToken}`,
      },
    });
  }
}

export default new RecoveryPasswordMail();
