#!/usr/bin/env bash
# website-nc-v3 Blueprint — local static server for the portal shell
# Usage: ./serve.sh [port]
# Default port: 8766 (rally-hq uses 8765; ports stay distinct so both can run)
set -euo pipefail
PORT="${1:-8766}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/portal" && pwd)"
# Kill anything on the port first so re-running is safe
if lsof -ti:"$PORT" >/dev/null 2>&1; then
  lsof -ti:"$PORT" | xargs kill -9 2>/dev/null || true
  sleep 0.5
fi
echo "Serving $DIR at http://localhost:$PORT/index.html"
cd "$DIR"
exec python3 -m http.server "$PORT"
