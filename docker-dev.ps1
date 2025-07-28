#!/usr/bin/env pwsh
# Script para gerenciar o ambiente de desenvolvimento Docker da Floriplanta

param(
    [Parameter(Position=0)]
    [ValidateSet("up", "down", "build", "logs", "shell", "db", "seed", "help")]
    [string]$Command = "help"
)

# Função para exibir ajuda
function Show-Help {
    Write-Host "🌱 Floriplanta - Ambiente de Desenvolvimento Docker" -ForegroundColor Green
    Write-Host ""
    Write-Host "Uso: .\docker-dev.ps1 [comando]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Comandos disponíveis:" -ForegroundColor Cyan
    Write-Host "  up      - Inicia todos os serviços (PostgreSQL + App)" -ForegroundColor White
    Write-Host "  down    - Para todos os serviços" -ForegroundColor White
    Write-Host "  build   - Reconstrói as imagens Docker" -ForegroundColor White
    Write-Host "  logs    - Exibe logs dos serviços" -ForegroundColor White
    Write-Host "  shell   - Acessa o shell do container da aplicação" -ForegroundColor White
    Write-Host "  db      - Acessa o PostgreSQL via psql" -ForegroundColor White
    Write-Host "  seed    - Executa os scripts de seed no container" -ForegroundColor White
    Write-Host "  help    - Exibe esta ajuda" -ForegroundColor White
    Write-Host ""
    Write-Host "URLs após iniciar:" -ForegroundColor Cyan
    Write-Host "  🌐 Aplicação: http://localhost:3000" -ForegroundColor Green
    Write-Host "  🗄️  Adminer:   http://localhost:8080 (opcional)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Credenciais de teste:" -ForegroundColor Cyan
    Write-Host "  📧 Email: admin@floriplanta.com.br" -ForegroundColor Yellow
    Write-Host "  🔑 Senha: admin123" -ForegroundColor Yellow
}

# Função para verificar se o Docker está rodando
function Test-Docker {
    try {
        docker version | Out-Null
        return $true
    } catch {
        Write-Host "❌ Docker não está rodando. Inicie o Docker Desktop primeiro." -ForegroundColor Red
        return $false
    }
}

# Executa o comando solicitado
switch ($Command) {
    "up" {
        if (-not (Test-Docker)) { exit 1 }
        Write-Host "🚀 Iniciando ambiente de desenvolvimento..." -ForegroundColor Green
        docker-compose -f docker-compose.dev.yml up -d
        Write-Host ""
        Write-Host "✅ Ambiente iniciado com sucesso!" -ForegroundColor Green
        Write-Host "🌐 Aplicação: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "🗄️  Adminer: docker-compose -f docker-compose.dev.yml --profile adminer up -d" -ForegroundColor Yellow
    }
    
    "down" {
        Write-Host "🛑 Parando ambiente de desenvolvimento..." -ForegroundColor Yellow
        docker-compose -f docker-compose.dev.yml down
        Write-Host "✅ Ambiente parado com sucesso!" -ForegroundColor Green
    }
    
    "build" {
        if (-not (Test-Docker)) { exit 1 }
        Write-Host "🔨 Reconstruindo imagens Docker..." -ForegroundColor Blue
        docker-compose -f docker-compose.dev.yml build --no-cache
        Write-Host "✅ Build concluído!" -ForegroundColor Green
    }
    
    "logs" {
        Write-Host "📋 Exibindo logs dos serviços..." -ForegroundColor Blue
        docker-compose -f docker-compose.dev.yml logs -f
    }
    
    "shell" {
        Write-Host "🐚 Acessando shell do container da aplicação..." -ForegroundColor Blue
        docker exec -it floriplanta-app-dev /bin/sh
    }
    
    "db" {
        Write-Host "🗄️  Acessando PostgreSQL..." -ForegroundColor Blue
        docker exec -it floriplanta-postgres-dev psql -U floriplanta -d floriplanta
    }
    
    "seed" {
        Write-Host "🌱 Executando scripts de seed..." -ForegroundColor Green
        docker exec floriplanta-app-dev npm run db:seed
        Write-Host "✅ Seeds executados com sucesso!" -ForegroundColor Green
    }
    
    "help" {
        Show-Help
    }
    
    default {
        Write-Host "❌ Comando inválido: $Command" -ForegroundColor Red
        Show-Help
        exit 1
    }
}