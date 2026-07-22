@echo off
echo.
echo ========================================
echo   Perplexity Chat Application Starter
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Starting Perplexity Application...
echo.

REM Check if both directories exist
if not exist "Backend" (
    echo Error: Backend directory not found
    pause
    exit /b 1
)

if not exist "Frontend" (
    echo Error: Frontend directory not found
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Backend Installation & Start
echo ========================================
echo.

cd Backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)

echo.
echo Starting backend server...
echo Backend running on http://localhost:3000
echo.

start cmd /k "node server.js"

timeout /t 3 /nobreak

echo.
echo ========================================
echo   Frontend Installation & Start
echo ========================================
echo.

cd ..\Frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)

echo.
echo Starting frontend development server...
echo Frontend running on http://localhost:5173
echo.

call npm run dev

pause
