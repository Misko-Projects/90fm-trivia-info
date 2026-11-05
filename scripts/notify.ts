/**
 * Posts a notification to SYNC_WEBHOOK_URL, which may be a Slack or a
 * Discord incoming webhook. The payload carries both shapes: Slack (and
 * Discord's `/slack` compatibility endpoint) reads `text`; Discord's native
 * endpoint ignores `text` and rejects the message as empty without `content`.
 *
 * Usage from GH Actions:
 *   tsx scripts/notify.ts pr "PR opened" "Source sync: home, rules" "https://github.com/.../pull/42"
 *   tsx scripts/notify.ts issue "Watcher needs attention" "Fetch failed for 3 pages" "https://github.com/.../issues/7"
 *   tsx scripts/notify.ts failure "Watcher run failed" "See action log"
 */

const [eventType = "info", title = "90FM Trivia watcher", message = "", link = ""] =
  process.argv.slice(2);

const url = process.env.SYNC_WEBHOOK_URL;
if (!url) {
  console.log("SYNC_WEBHOOK_URL not set — skipping notification.");
  process.exit(0);
}

const emoji = (
  {
    pr: ":sparkles:",
    issue: ":warning:",
    failure: ":x:",
    info: ":information_source:",
  } as Record<string, string>
)[eventType] ?? ":information_source:";

const text = [
  `${emoji} *${title}*`,
  message,
  link ? `<${link}|View in GitHub>` : "",
]
  .filter(Boolean)
  .join("\n");

// Discord markdown differs from Slack's: **bold** and [label](url).
const DISCORD_CONTENT_LIMIT = 2000;
const content = [
  `${emoji} **${title}**`,
  message,
  link ? `[View in GitHub](${link})` : "",
]
  .filter(Boolean)
  .join("\n")
  .slice(0, DISCORD_CONTENT_LIMIT);

const payload = {
  text,
  content,
  username: "90FM Trivia Watcher",
};

async function send() {
  const res = await fetch(url!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error(`Webhook returned ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  console.log(`Notification sent (${eventType}).`);
}

send().catch((err) => {
  console.error("Notification failed:", err);
  process.exit(1);
});
