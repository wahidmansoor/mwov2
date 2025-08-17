@echo off
echo Starting OncoVista Development Environment...

REM Set environment variables
set PORT=3001
set NODE_ENV=development

REM Start server in background
echo Starting server on port 3001...
start "OncoVista Server" cmd /k "cd server && npm run dev"

REM Wait a moment for server to start
timeout /t 3 /nobreak > nul

REM Start client
echo Starting client on port 5173...
cd client && npm run dev
