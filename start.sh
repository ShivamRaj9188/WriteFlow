#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# WriteFlow – One-command local dev launcher
# Usage: ./start.sh
# Starts backend (Spring Boot :8080) and frontend (Vite :5173) in parallel.
# Press Ctrl+C once to stop both.
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

# ── Colours ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'
YELLOW='\033[1;33m'; BOLD='\033[1m'; RESET='\033[0m'

echo -e "\n${BOLD}${CYAN}  WriteFlow – Local Dev Stack${RESET}"
echo -e "  ${YELLOW}Backend  → http://localhost:8080${RESET}"
echo -e "  ${YELLOW}Frontend → http://localhost:5173${RESET}\n"

# ── Load backend .env ─────────────────────────────────────────────────────────
ENV_FILE="$BACKEND_DIR/.env"
if [[ -f "$ENV_FILE" ]]; then
  echo -e "${GREEN}✔ Loading backend env from backend/.env${RESET}"
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
else
  echo -e "${RED}✘ backend/.env not found – backend may fail to start.${RESET}"
fi

# ── Cleanup on Ctrl+C ─────────────────────────────────────────────────────────
cleanup() {
  echo -e "\n${YELLOW}Shutting down...${RESET}"
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
  wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
  echo -e "${GREEN}All services stopped. Goodbye!${RESET}"
}
trap cleanup INT TERM

# ── Start Backend ─────────────────────────────────────────────────────────────
echo -e "${CYAN}► Starting Spring Boot backend...${RESET}"
(cd "$BACKEND_DIR" && ./mvnw spring-boot:run 2>&1 | sed 's/^/[backend] /') &
BACKEND_PID=$!

# ── Start Frontend ────────────────────────────────────────────────────────────
echo -e "${CYAN}► Starting Vite frontend...${RESET}"
(cd "$FRONTEND_DIR" && npm run dev 2>&1 | sed 's/^/[frontend] /') &
FRONTEND_PID=$!

echo -e "\n${GREEN}${BOLD}✔ Both services started. Press Ctrl+C to stop.${RESET}\n"

# Wait for either process to exit
wait -n "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
cleanup
