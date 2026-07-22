Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Perplexity Chat Application Starter" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if directories exist
if (-not (Test-Path "Backend")) {
    Write-Host "Error: Backend directory not found" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not (Test-Path "Frontend")) {
    Write-Host "Error: Frontend directory not found" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Backend Installation & Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Push-Location Backend

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "Backend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting backend server on http://localhost:3000..." -ForegroundColor Cyan
Write-Host ""

# Start backend in a new terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node server.js"

Start-Sleep -Seconds 3

Pop-Location

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Frontend Installation & Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Push-Location Frontend

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "Frontend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting frontend development server on http://localhost:5173..." -ForegroundColor Cyan
Write-Host ""

npm run dev

Pop-Location
