@echo off
chcp 65001 >nul 2>&1
title Smart Travel System

echo.
echo   ============================================
echo     Smart Travel Portal v2.0
echo   ============================================
echo.

set "PROJECT_DIR=%~dp0"

:: ========== Kill existing processes on target ports ==========
echo [1/4] Checking ports...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr ":8088 "') do (
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr ":5173 "') do (
    taskkill /F /PID %%a >nul 2>&1
)
ping -n 3 127.0.0.1 >nul

:: ========== Start Spring Boot Backend ==========
echo [2/4] Starting backend (port 8088)...
start "Travel-Backend" /MIN cmd /c "cd /d %PROJECT_DIR%backend && java -jar target\smart-travel-1.0.0.jar"
echo   Waiting for backend (15s)...
ping -n 16 127.0.0.1 >nul

:: ========== Start Frontend ==========
echo [3/4] Starting frontend (port 5173)...
set "PATH=D:\Claude Code;%PATH%"
start "Travel-Frontend" /MIN cmd /c "cd /d %PROJECT_DIR%frontend && set PATH=D:\Claude Code;%%PATH%% && set USE_REAL_BACKEND=true && npx vite --host 0.0.0.0 --port 5173 --strictPort"
ping -n 6 127.0.0.1 >nul

:: ========== Open Browser ==========
echo [4/4] Opening browser...

start http://localhost:5173

:done
echo.
echo   ============================================
echo   Startup complete!
echo.
echo   Frontend : http://localhost:5173
echo   Backend  : http://localhost:8088
echo   H2       : http://localhost:8088/h2-console
echo.
echo   Accounts:
echo     admin    / 123456
echo     traveler / 123456
echo   ============================================
echo.
echo   Press any key to close this window...
pause >nul
