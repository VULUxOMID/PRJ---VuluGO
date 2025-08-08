#!/usr/bin/env bash
set -euo pipefail

# Load env from .env.local if present
if [ -f ./.env.local ]; then
  set -a
  # shellcheck disable=SC1091
  source ./.env.local
  set +a
fi

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is not set. Export it or create .env.local." >&2
  exit 1
fi

exec psql "$DATABASE_URL"


