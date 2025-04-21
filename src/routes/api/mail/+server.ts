import { json } from '@sveltejs/kit';

import { sendMail } from '$lib/services/mail';

export const POST = async ({ request }) => {
    const email = await request.json();
    try {
        await sendMail(email);
        return json({ success: true }, { status: 200 });
    } catch (error) {
        return json({ error: error.message || 'An error occurred' }, { status: 500 });
    }
};
