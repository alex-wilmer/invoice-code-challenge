import { Resend } from "resend";

export default async function handler(request, response) {
  // const resend = new Resend(process.env.RESEND_API_KEY);
  const resend = new Resend("re_VaqaoRda_E5ryF33kQGESmRPsj66RJfHu");

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "djazium@gmail.com",
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  return response.send(`Hello world!`);
}
