# Script de desarrollo local — venezuela723975
# Uso: .\dev.ps1

Write-Host "🕯 Arrancando venezuela723975 en local..." -ForegroundColor Yellow

# Levantar Docker (Postgres + Redis) si no están corriendo
docker compose -f docker-compose.dev.yml up -d

Start-Sleep -Seconds 2

# Variables de entorno
$env:DATABASE_URL = "postgresql://v723975:dev_password_local@localhost:5434/venezuela723975"
$env:REDIS_URL = "redis://localhost:6380"
$env:API_PORT = "4000"
$env:JWT_SECRET = "dev_secret_local"
$env:NODE_ENV = "development"
$env:NEXT_PUBLIC_API_URL = "http://localhost:4000/api/v1"

# Arrancar API en background
Write-Host "→ Arrancando API en puerto 4000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\apps\api'; `$env:DATABASE_URL='postgresql://v723975:dev_password_local@localhost:5434/venezuela723975'; `$env:API_PORT='4000'; `$env:JWT_SECRET='dev_secret_local'; `$env:NODE_ENV='development'; npx tsx src/server.ts"

Start-Sleep -Seconds 3

# Arrancar Web
Write-Host "→ Arrancando Web en puerto 3000..." -ForegroundColor Cyan
Set-Location apps\web
$env:NEXT_PUBLIC_API_URL = "http://localhost:4000/api/v1"
npx next dev