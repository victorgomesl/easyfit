import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendVerificationEmail(url: string, email: string) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to: email,
      subject: "Seu link de login no EasyFit",
      html: `<p>Para acessar o EasyFit, clique neste link:</p>
             <p><a href="${url}">${url}</a></p>`,
    });
  } catch (error) {
    console.error("Erro ao enviar email com Resend:", error);
    throw new Error("Erro ao enviar o email de verificação");
  }
}
