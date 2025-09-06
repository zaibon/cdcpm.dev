import nodemailer from 'nodemailer';

import { env } from '$env/dynamic/private';

export interface Email {
	name: string;
	email: string;
	message: string;
}


const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST,
	port: parseInt(env.SMTP_PORT ?? '465'),
	secure: true,
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASSWORD
	},
	tls: {
		ciphers: 'SSLv3'
	}
});

// send the message and get a callback with an error or details of the message that was sent
export async function sendMail(email: Email): Promise<void> {
	await transporter.sendMail({
		from: `"${email.name}" <${email.email}>`,
		to: 'christophe.dcpm@gmail.com',
		subject: 'Contact message from cdcpm.dev',
		text: email.message
	});
}
