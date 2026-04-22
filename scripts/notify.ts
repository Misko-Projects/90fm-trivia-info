/**
 * Posts a Slack-formatted notification to SYNC_WEBHOOK_URL.
 * Slack and Discord both accept Slack-style payloads (Discord supports it
 * when the webhook URL ends with `/slack`, otherwise raw JSON works too).
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

const payload = {
  text,
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
