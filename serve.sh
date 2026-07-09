#!/usr/bin/env bash
# Boot the Review Portal locally (Stage 0 recipe + prototype-smoke-runner contract).
# Port 8903 claimed for this initiative; override with PORT=... ./serve.sh
cd "$(dirname "$0")/blueprint/portal" && exec python3 -m http.server "${PORT:-8903}"
