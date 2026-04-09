# Deploy Parseable on Railway

## What is this?
This repository is a minimal Railway template setup to run Parseable quickly.
It helps you deploy Parseable and start ingesting logs with almost zero setup.

## One-click deploy
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=YOUR_GITHUB_REPO_URL)

## After deploying
1. Open your Railway project and click the generated public URL.
2. Parseable UI should load on port 8000 through Railway routing.
3. Login with demo credentials: `admin` / `password123`.
4. These credentials are only for demo/testing, not for production.

## How to send logs
Use this curl command after deployment:

```bash
curl -X POST https://your-parseable-url/api/v1/logstream/my-app \
  -u admin:password123 \
  -H "Content-Type: application/json" \
  -d '[{"level":"info","message":"hello","timestamp":"2024-01-01T00:00:00Z"}]'
```

## Environment variables
| Variable | Example Value | Why it is needed |
|---|---|---|
| `P_USERNAME` | `admin` | Parseable basic auth username |
| `P_PASSWORD` | `password123` | Parseable basic auth password |
| `P_STAGING_DIR` | `/tmp/parseable/staging` | Temporary staging location for ingest pipeline |
| `P_HOT_TIER_PATH` | `/var/lib/parseable` | Storage path for hot data in Parseable |
| `PARSEABLE_URL` | `http://localhost:8000` | Used by `send-logs.js` for local or remote target |

## Local quick test with Docker
Run Parseable locally:

```bash
docker run --name parseable-local -p 8000:8000 \
  -e P_USERNAME=admin \
  -e P_PASSWORD=password123 \
  -e P_STAGING_DIR=/tmp/parseable/staging \
  -e P_HOT_TIER_PATH=/var/lib/parseable \
  parseable/parseable:latest
```

Check liveness:

```bash
curl http://localhost:8000/api/v1/liveness
```

Send test logs using script:

```bash
PARSEABLE_URL=http://localhost:8000 node send-logs.js
```

Stop local container:

```bash
docker rm -f parseable-local
```

## GitHub push commands
Create repository and push:

```bash
git init
git checkout -b feat/railway-parseable-template
git add .
git commit -m "feat: add Parseable Railway template with log sender"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin feat/railway-parseable-template
```

Merge into main:

```bash
git checkout main
git merge feat/railway-parseable-template
git push origin main
```

## Deploy on Railway using this repo
1. Go to Railway dashboard and click New Project.
2. Choose Deploy from GitHub repo.
3. Select this repository.
4. If Railway does not auto-apply env from railway.json, add these variables in the service Variables tab:
  - P_USERNAME=admin
  - P_PASSWORD=password123
  - P_STAGING_DIR=/tmp/parseable/staging
  - P_HOT_TIER_PATH=/var/lib/parseable
5. Wait for deploy to complete.
6. Open the generated Railway URL.
7. Validate health endpoint:

```bash
curl https://<your-railway-url>/api/v1/liveness
```

8. Send logs to deployed Parseable:

```bash
PARSEABLE_URL=https://<your-railway-url> node send-logs.js
```
