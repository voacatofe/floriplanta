# Script PowerShell para configurar ambiente de desenvolvimento local
# Execute com: .\scripts\setup-dev.ps1

Write-Host "🚀 Configurando ambiente de desenvolvimento local da Floriplanta" -ForegroundColor Green
Write-Host ""

# Verificar se Docker está rodando
Write-Host "📋 Verificando Docker..." -ForegroundColor Yellow
try {
    docker --version | Out-Null
    docker ps | Out-Null
    Write-Host "✅ Docker está rodando" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não está rodando. Por favor, inicie o Docker Desktop." -ForegroundColor Red
    exit 1
}

# Verificar se Node.js está instalado
Write-Host "📋 Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion instalado" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Por favor, instale o Node.js." -ForegroundColor Red
    exit 1
}

# Criar arquivo .env.local se não existir
if (-not (Test-Path ".env.local")) {
    Write-Host "📋 Criando arquivo .env.local..." -ForegroundColor Yellow
    Copy-Item ".env.local.example" ".env.local"
    Write-Host "✅ Arquivo .env.local criado. Edite-o se necessário." -ForegroundColor Green
} else {
    Write-Host "✅ Arquivo .env.local já existe" -ForegroundColor Green
}

# Instalar dependências
Write-Host "📋 Instalando dependências..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependências instaladas" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}

# Iniciar PostgreSQL com Docker
Write-Host "📋 Iniciando PostgreSQL..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml up -d postgres
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PostgreSQL iniciado" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao iniciar PostgreSQL" -ForegroundColor Red
    exit 1
}

# Aguardar PostgreSQL ficar pronto
Write-Host "📋 Aguardando PostgreSQL ficar pronto..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Executar migrações
Write-Host "📋 Executando migrações do banco..." -ForegroundColor Yellow
npx prisma migrate dev --name init
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Migrações executadas" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao executar migrações" -ForegroundColor Red
    exit 1
}

# Executar seeds
Write-Host "📋 Populando banco com dados de exemplo..." -ForegroundColor Yellow
node scripts/seedAdmin.mjs
node scripts/seedBlog.mjs
node scripts/importEncyclopediaFromCSV.mjs
Write-Host "✅ Dados de exemplo inseridos" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Ambiente configurado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar o desenvolvimento:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "URLs disponíveis:" -ForegroundColor Cyan
Write-Host "  🌐 Aplicação: http://localhost:3000" -ForegroundColor White
Write-Host "  🔐 Admin: http://localhost:3000/admin" -ForegroundColor White
Write-Host "  📊 Prisma Studio: npx prisma studio" -ForegroundColor White
Write-Host "  🗄️  Adminer (DB): docker-compose -f docker-compose.dev.yml --profile adminer up -d" -ForegroundColor White
Write-Host ""
Write-Host "Credenciais do admin:" -ForegroundColor Cyan
Write-Host "  Email: admin@floriplanta.com.br" -ForegroundColor White
Write-Host "  Senha: admin123" -ForegroundColor White
Write-Host ""