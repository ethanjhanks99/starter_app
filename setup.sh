#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

ENV_FILE=".env.local"

log() {
  echo "[setup] $1"
}

fail() {
  echo "[setup] ERROR: $1" >&2
  exit 1
}

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    fail "Missing required command: $cmd"
  fi
}

upsert_env_var() {
  local key="$1"
  local value="$2"
  local file="$3"
  local tmp_file

  touch "$file"
  tmp_file="$(mktemp)"

  awk -v key="$key" 'index($0, key "=") == 1 { next } { print }' "$file" > "$tmp_file"
  printf '%s="%s"\n' "$key" "$value" >> "$tmp_file"

  mv "$tmp_file" "$file"
}

extract_env_value() {
  local source_text="$1"
  local key="$2"

  printf '%s\n' "$source_text" \
    | sed -n "s/^${key}=\"\(.*\)\"$/\1/p" \
    | head -n 1
}

log "Checking prerequisites"
require_cmd node
require_cmd npm
require_cmd npx
require_cmd docker

if ! docker info >/dev/null 2>&1; then
  fail "Docker engine is not running. Start Docker and rerun ./setup.sh"
fi

if ! npx supabase --version >/dev/null 2>&1; then
  fail "Supabase CLI is not available through npx. Run npm install and try again."
fi

log "Installing npm dependencies"
npm install

log "Starting local Supabase services"
if ! supabase_start_output="$(npx supabase start 2>&1)"; then
  echo "$supabase_start_output" >&2
  fail "Failed to start local Supabase"
fi
echo "$supabase_start_output"

log "Extracting local Supabase credentials"
if ! status_env="$(npx supabase status -o env 2>&1)"; then
  echo "$status_env" >&2
  fail "Failed to read Supabase status"
fi
echo "$status_env"

api_url="$(extract_env_value "$status_env" "API_URL")"
anon_key="$(extract_env_value "$status_env" "ANON_KEY")"

if [[ -z "$api_url" ]]; then
  fail "Could not extract API_URL from Supabase status output"
fi

if [[ -z "$anon_key" ]]; then
  fail "Could not extract ANON_KEY from Supabase status output"
fi

log "Updating ${ENV_FILE}"
upsert_env_var "NEXT_PUBLIC_SUPABASE_URL" "$api_url" "$ENV_FILE"
upsert_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$anon_key" "$ENV_FILE"

log "Running database migrations"
if [[ -f "supabase/seed.sql" ]]; then
  npx supabase db reset --yes
else
  npx supabase db reset --no-seed --yes
fi

log "Setup complete"
echo ""
echo "Next steps:"
echo "  1) Start app: npm run dev"
echo "  2) Open app: http://localhost:3000"
echo "  3) Supabase Studio: http://127.0.0.1:54323"
echo ""
echo "Configured in ${ENV_FILE}:"
echo "  NEXT_PUBLIC_SUPABASE_URL=${api_url}"
echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY=<redacted>"