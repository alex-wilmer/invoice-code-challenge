import { Resend } from "resend";

export default async function handler(request, response) {
  // use environment variable in production
  const resend = new Resend("re_VaqaoRda_E5ryF33kQGESmRPsj66RJfHu");

  const { body } = request;

  console.log(body);

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "djazium@gmail.com",
      subject: "New Invoice",
      html: `<p>You can have received a new invoice from ${body.companyName} for the amount $${body.total}.</p>
      <p>We don't store these invoices anywhere, so you can't pay them which is good because they're not real invoices anyways!`,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  return response.json({ message: `Invoice submitted successfully` });
}
