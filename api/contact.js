import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, project, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    await resend.emails.send({
      from: 'Scott Arthur Yerkey Design <noreply@scottarthuryerkey.com>',
      to:   'chris@scottarthuryerkey.com',
      replyTo: email,
      subject: `New Inquiry — ${name}${project ? ` · ${project}` : ''}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    max-width: 600px; margin: 0 auto; color: #1C1C1A;">
          <div style="border-bottom: 1px solid #EDE8DF; padding-bottom: 24px; margin-bottom: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
                      color: #8C7355; margin: 0 0 8px;">Scott Arthur Yerkey Design</p>
            <h2 style="margin: 0; font-weight: 300; font-size: 24px;">New Inquiry</h2>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.8;">
            <tr>
              <td style="padding: 6px 0; color: #9E9589; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 6px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #9E9589; vertical-align: top;">Email</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #8C7355;">${email}</a></td>
            </tr>
            ${project ? `
            <tr>
              <td style="padding: 6px 0; color: #9E9589; vertical-align: top;">Project Type</td>
              <td style="padding: 6px 0;">${project}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #EDE8DF;">
            <p style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
                      color: #9E9589; margin: 0 0 12px;">Message</p>
            <p style="font-size: 13px; line-height: 1.9; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #EDE8DF;
                      font-size: 11px; color: #C4B5A0;">
            Reply directly to this email to respond to ${name}.
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send. Please try again.' });
  }
}
