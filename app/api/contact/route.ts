import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        const result = await resend.emails.send({
            from: `${name} <onboarding@resend.dev>`,
            to: 'isaiahozadhe247@gmail.com',
            subject: 'New message from your portfolio',
            text: `
            Name: ${name}
            Email: ${email}
            Message:
            ${message}
            `,
        });

        if (result.error) {
            return Response.json({
                success: false,
                error: result.error,
            });
        }

        return Response.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('Unhandled error in /api/contact:', error);
        return Response.json({
            success: false,
            error: { message: 'Unexpected server error', details: error },
        });
    }
}
