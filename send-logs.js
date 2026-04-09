const PARSEABLE_URL = process.env.PARSEABLE_URL || 'http://localhost:8000';
const USERNAME = process.env.P_USERNAME || 'admin';
const PASSWORD = process.env.P_PASSWORD || 'password123';

const logs = [
  { level: 'info', message: 'User logged in', service: 'auth', timestamp: new Date().toISOString() },
  { level: 'error', message: 'Database timeout', service: 'api', timestamp: new Date().toISOString() },
  { level: 'warn', message: 'High memory usage', service: 'worker', timestamp: new Date().toISOString() }
];

async function sendLogs() {
  const response = await fetch(`${PARSEABLE_URL}/api/v1/ingest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-P-Stream': 'demo',
      'Authorization': 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')
    },
    body: JSON.stringify(logs)
  });

  if (response.ok) {
    console.log('✅ Logs sent successfully!');
  } else {
    console.log('❌ Failed:', response.status, await response.text());
  }
}

sendLogs();