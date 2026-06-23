# ============================================================
# GitHub Setup Script for Smart Travel Portal
# 使用方法: 安装 Git 后双击运行此脚本
# ============================================================

$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectDir

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Smart Travel Portal - GitHub Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Initialize Git repo
Write-Host "[1/4] Initializing Git repository..." -ForegroundColor Yellow
git init
Write-Host "  Done." -ForegroundColor Green

# 2. Stage all files
Write-Host "[2/4] Staging files..." -ForegroundColor Yellow
git add .
Write-Host "  Done." -ForegroundColor Green

# 3. Create initial commit
Write-Host "[3/4] Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Smart Travel Portal - Spring Boot + Vue 3"
Write-Host "  Done." -ForegroundColor Green

# 4. Instructions for GitHub
Write-Host ""
Write-Host "[4/4] To push to GitHub, run these commands:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  # First, create a new repo on https://github.com/new" -ForegroundColor White
Write-Host "  # Then run:" -ForegroundColor White
Write-Host ""
Write-Host "  git remote add origin https://github.com/YOUR_USERNAME/smart-travel-portal.git" -ForegroundColor Cyan
Write-Host "  git branch -M main" -ForegroundColor Cyan
Write-Host "  git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Repository initialized successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

Read-Host "Press Enter to exit"
