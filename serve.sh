#!/usr/bin/env bash
# Boot the Review Portal locally (Stage 0 recipe + prototype-smoke-runner contract).
# Port 8903 claimed for this initiative.
cd "$(dirname "$0")/blueprint/portal" && exec python3 -m http.server 8903
