#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# WriteFlow – One-command local dev launcher
# Usage: ./start.sh
# Starts backend (Spring Boot :8080) and frontend (Vite :5173) in parallel.
# Press Ctrl+C once to stop both.
# ─────────────────────────────────────────────────────────────────────────────

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

# ── Colours ──────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; CYAN='\033[0;36m'
YELLOW='\033[1;33m'; BOLD='\033[1m'; RESET='\033[0m'

echo -e "\n${BOLD}${CYAN}  WriteFlow – Local Dev Stack${RESET}"
echo -e "  ${YELLOW}Backend  → http://localhost:8080${RESET}"
echo -e "  ${YELLOW}Frontend → http://localhost:5173${RESET}\n"

# ── Load backend .env ─────────────────────────────────────────────────────────
if [[ -f "$BACKEND_DIR/.env" ]]; then
  echo -e "${GREEN}✔ Loading backend env from backend/.env${RESET}"
  export $(grep -v '^#' "$BACKEND_DIR/.env" | xargs)
fi

# ── Cleanup on Exit ───────────────────────────────────────────────────────────
trap 'echo -e "\n${YELLOW}Shutting down services...${RESET}"; kill $(jobs -p) 2>/dev/null; exit' EXIT INT TERM

# ── Start Services ────────────────────────────────────────────────────────────
echo -e "${CYAN}► Starting Spring Boot backend...${RESET}"
(cd "$BACKEND_DIR" && ./mvnw spring-boot:run) &

echo -e "${CYAN}► Starting Vite frontend...${RESET}"
(cd "$FRONTEND_DIR" && npm run dev) &

echo -e "\n${GREEN}${BOLD}✔ Both services started. Press Ctrl+C to stop.${RESET}\n"

# ── Wait for Processes ────────────────────────────────────────────────────────
wait
