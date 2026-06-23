@echo off
echo Stopping Smart Travel Portal...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173.*LISTENING" 2^>nul') do (
    taskkill /F /PID %%a >nul 2>nul && echo Server stopped.
)
if errorlevel 1 echo No server was running.
pause