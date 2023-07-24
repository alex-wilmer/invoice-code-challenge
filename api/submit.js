import { Resend } from "resend";

export default function handler(request, response) {
  const resend = new Resend(proces.env.RESEND_API_KEY);

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "djazium@gmail.com",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });

  return response.send(`Hello world!`);
}
