# Parseable on Railway

One-click deploy [Parseable](https://parseable.com) — lightweight, open-source log analytics — on Railway.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/parseable)

## Usage

1. Click **Deploy on Railway** above
2. Set your `P_PASSWORD` in environment variables
3. Open the Railway-assigned URL in browser
4. Login with `admin` / your password
5. Send a test log:

```bash
curl --location --request POST \
'https://YOUR-RAILWAY-URL/api/v1/ingest' \
--header 'X-P-Stream: demo' \
--header 'Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=' \
--header 'Content-Type: application/json' \
--data-raw '[{"level":"info","message":"hello from Railway!","service":"demo"}]'
```

Or use the included script:
```bash
PARSEABLE_URL=https://YOUR-RAILWAY-URL node send-logs.js
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| P_USERNAME | admin | Admin username for Parseable UI |
| P_PASSWORD | password123 | Admin password — change this! |
| P_STAGING_DIR | /tmp/parseable/staging | Staging path for log ingestion |
| P_HOT_TIER_PATH | /var/lib/parseable | Local storage path for log data |
| PORT | 8000 | Port Parseable runs on |

## Resources

- [Parseable Docs](https://parseable.com/docs)
- [Parseable GitHub](https://github.com/parseablehq/parseable)