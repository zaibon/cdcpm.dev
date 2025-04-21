import { type Message, SMTPClient } from 'emailjs';

import { env } from '$env/dynamic/private';

export interface Email {
    name: string;
    email: string;
    message: string;
}

const client = new SMTPClient({
    user: env.SMTP_USER,
    password: env.SMTP_PASSWORD,
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT ?? '587'),
    tls: true
});

// send the message and get a callback with an error or details of the message that was sent
export async function sendMail(email: Email): Promise<Message> {
    const message = await client.sendAsync({
        text: email.message,
        from: email.email,
        to: `christophe <christophe.dcpm@gmail.com>`,
        subject: 'Contact message from cdcpm.dev',
    });
    return message;
}