/**
 * Minimal Telegram Bot API helper.
 *
 * Setup:
 *  1. Create a bot via @BotFather -> get the token.
 *  2. Send your bot any message, then open
 *     https://api.telegram.org/bot<token>/getUpdates to find your chat id.
 *  3. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID as env vars.
 */

export async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn('Telegram not configured (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing).');
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error('Telegram send failed:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('Telegram send error:', err instanceof Error ? err.message : String(err));
    return false;
  }
}
