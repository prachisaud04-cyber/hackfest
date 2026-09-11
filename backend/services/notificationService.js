const nodemailer = require('nodemailer');

/**
 * HackFest 2026 Notification Service
 * Dispatches automated confirmation emails and Discord / Slack webhooks.
 */

// Configure nodemailer transporter if SMTP credentials are provided
function createTransporter() {
  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const port = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT) || 587;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

/**
 * Sends a stylized HTML confirmation email to the participant.
 */
async function sendRegistrationEmail(registration) {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log(`ℹ️ [Email] SMTP credentials not configured. Email confirmation skipped for: ${registration.email}`);
      return;
    }

    const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@hackfest.org';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f3f4f6; margin: 0; padding: 24px; }
          .container { max-width: 580px; margin: 0 auto; background: #0b1329; border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 12px; padding: 32px; }
          .header { text-align: center; border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 20px; }
          .title { color: #00f0ff; font-size: 26px; font-weight: 800; letter-spacing: 2px; margin: 0; }
          .subtitle { color: #9ca3af; font-size: 14px; margin-top: 6px; }
          .ticket-card { background: #030712; border: 1px solid rgba(0, 240, 255, 0.4); border-radius: 8px; padding: 20px; margin: 24px 0; }
          .id-badge { display: inline-block; background: rgba(0, 240, 255, 0.15); color: #00f0ff; padding: 6px 14px; border-radius: 6px; font-family: monospace; font-size: 18px; font-weight: bold; }
          .field-row { display: flex; justify-content: space-between; margin: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 6px; }
          .label { color: #9ca3af; font-size: 13px; }
          .value { color: #f3f4f6; font-weight: 600; font-size: 14px; }
          .footer { text-align: center; font-size: 12px; color: #6b7280; margin-top: 24px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">HACKFEST 2026</h1>
            <p class="subtitle">Registration Confirmed · 16–17 October 2026</p>
          </div>
          <p>Hello <strong>${registration.fullName}</strong>,</p>
          <p>Your team is officially registered for HackFest 2026! Here is your digital event pass:</p>
          
          <div class="ticket-card">
            <div style="text-align: center; margin-bottom: 16px;">
              <span class="label">REGISTRATION ID</span><br/>
              <span class="id-badge">${registration.registrationId}</span>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #9ca3af;">Team:</td>
                <td style="padding: 6px 0; color: #f3f4f6; font-weight: bold; text-align: right;">${registration.teamName} (${registration.teamSize} Members)</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #9ca3af;">Role:</td>
                <td style="padding: 6px 0; color: #f3f4f6; font-weight: bold; text-align: right;">${registration.role}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #9ca3af;">Track:</td>
                <td style="padding: 6px 0; color: #00f0ff; font-weight: bold; text-align: right;">${registration.track}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #9ca3af;">Institution:</td>
                <td style="padding: 6px 0; color: #f3f4f6; text-align: right;">${registration.college}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #9ca3af;">Venue:</td>
                <td style="padding: 6px 0; color: #f3f4f6; text-align: right;">Information Technology department, Gauhati University</td>
              </tr>
            </table>
          </div>

          <p style="text-align: center;">
            <a href="${process.env.CLIENT_URL || 'https://hackfest.org'}/status?email=${encodeURIComponent(registration.email)}" style="background: #00f0ff; color: #030712; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
              View Live Ticket & Status
            </a>
          </p>

          <div class="footer">
            <p>Know the rules. Build boldly. Ship responsibly.</p>
            <p>HackFest 2026 Organizing Committee · Gauhati University</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"HackFest 2026" <${fromEmail}>`,
      to: registration.email,
      subject: `⚡ Registration Confirmed: ${registration.registrationId} - HackFest 2026`,
      html: htmlContent,
    });

    console.log(`✅ [Email] Confirmation sent to ${registration.email}`);
  } catch (err) {
    console.error('⚠️ [Email Error]', err.message);
  }
}

/**
 * Sends a real-time notification to Discord if DISCORD_WEBHOOK_URL is set.
 */
async function sendDiscordWebhook(registration) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const payload = {
      embeds: [
        {
          title: '🚀 New Team Registered for HackFest 2026!',
          color: 0x00f0ff,
          fields: [
            { name: '🆔 Registration ID', value: `\`${registration.registrationId}\``, inline: true },
            { name: '👥 Team Name', value: registration.teamName, inline: true },
            { name: '👤 Team Lead', value: registration.fullName, inline: true },
            { name: '🎯 Track', value: registration.track, inline: true },
            { name: '🔢 Team Size', value: String(registration.teamSize), inline: true },
            { name: '🏫 College', value: registration.college, inline: true },
          ],
          footer: { text: 'HackFest 2026 Live Registration System' },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log('📢 [Discord] Webhook alert sent successfully');
  } catch (err) {
    console.warn('⚠️ [Discord Webhook]', err.message);
  }
}

/**
 * Sends a real-time notification to Slack if SLACK_WEBHOOK_URL is set.
 */
async function sendSlackWebhook(registration) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const payload = {
      text: `🚀 *New Team Registered!* \`${registration.registrationId}\` - *${registration.teamName}* (${registration.track}) by ${registration.fullName} from ${registration.college}`,
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log('📢 [Slack] Webhook alert sent successfully');
  } catch (err) {
    console.warn('⚠️ [Slack Webhook]', err.message);
  }
}

/**
 * Asynchronously dispatches all active notifications.
 */
function notifyAll(registration) {
  // Run asynchronously in background without delaying HTTP response
  Promise.allSettled([
    sendRegistrationEmail(registration),
    sendDiscordWebhook(registration),
    sendSlackWebhook(registration),
  ]).catch(() => {});
}

module.exports = {
  sendRegistrationEmail,
  sendDiscordWebhook,
  sendSlackWebhook,
  notifyAll,
};
