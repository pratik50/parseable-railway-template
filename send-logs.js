const http = require("http");
const https = require("https");

const parseableUrl = process.env.PARSEABLE_URL || "http://localhost:8000";
const streamName = "my-app-logs";
const totalLogs = 10;
const intervalMs = 2000;

const username = "admin";
const password = "password123";

const target = new URL(parseableUrl);
const client = target.protocol === "https:" ? https : http;

let sent = 0;

function makeLog() {
  return {
    level: "info",
    message: "User logged in",
    userId: Math.floor(Math.random() * 10000),
    timestamp: new Date().toISOString()
  };
}

function sendOneLog(index) {
  return new Promise((resolve) => {
    const payload = JSON.stringify([makeLog()]);

    const options = {
      protocol: target.protocol,
      hostname: target.hostname,
      port: target.port || (target.protocol === "https:" ? 443 : 80),
      path: `/api/v1/logstream/${streamName}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
      }
    };

    const req = client.request(options, (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`Sent log ${index}/${totalLogs}`);
        } else {
          console.error(`Failed log ${index}/${totalLogs}: HTTP ${res.statusCode}`);
        }
        resolve();
      });
    });

    req.on("error", (err) => {
      console.error(`Error on log ${index}/${totalLogs}:`, err.message);
      resolve();
    });

    req.write(payload);
    req.end();
  });
}

const timer = setInterval(async () => {
  sent += 1;
  await sendOneLog(sent);

  if (sent >= totalLogs) {
    clearInterval(timer);
    console.log("Done sending logs.");
  }
}, intervalMs);
