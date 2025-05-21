import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        const data = await resend.emails.send({
            from: email,
            to: 'isaiahozadhe247@gmail.com',
            subject: subject,
            text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message:
        ${message}
      `,
        });

        return Response.json({ success: true, data });
    } catch (error) {
        return Response.json({ success: false, error });
    }
}
