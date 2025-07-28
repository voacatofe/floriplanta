#!/bin/bash

# Script para configurar ambiente de desenvolvimento local
# Execute com: ./scripts/setup-dev.sh

echo "🚀 Configurando ambiente de desenvolvimento local da Floriplanta"
echo ""

# Verificar se Docker está rodando
echo "📋 Verificando Docker..."
if ! command -v docker &> /dev/null || ! docker ps &> /dev/null; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker Desktop."
    exit 1
fi
echo "✅ Docker está rodando"

# Verificar se Node.js está instalado
echo "📋 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js."
    exit 1
fi
echo "✅ Node.js $(node --version) instalado"

# Criar arquivo .env.local se não existir
if [ ! -f ".env.local" ]; then
    echo "📋 Criando arquivo .env.local..."
    cp ".env.local.example" ".env.local"
    echo "✅ Arquivo .env.local criado. Edite-o se necessário."
else
    echo "✅ Arquivo .env.local já existe"
fi

# Instalar dependências
echo "📋 Instalando dependências..."
if npm install; then
    echo "✅ Dependências instaladas"
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

# Iniciar PostgreSQL com Docker
echo "📋 Iniciando PostgreSQL..."
if docker-compose -f docker-compose.dev.yml up -d postgres; then
    echo "✅ PostgreSQL iniciado"
else
    echo "❌ Erro ao iniciar PostgreSQL"
    exit 1
fi

# Aguardar PostgreSQL ficar pronto
echo "📋 Aguardando PostgreSQL ficar pronto..."
sleep 10

# Executar migrações
echo "📋 Executando migrações do banco..."
if npx prisma migrate dev --name init; then
    echo "✅ Migrações executadas"
else
    echo "❌ Erro ao executar migrações"
    exit 1
fi

# Executar seeds
echo "📋 Populando banco com dados de exemplo..."
node scripts/seedAdmin.mjs
node scripts/seedBlog.mjs
node scripts/importEncyclopediaFromCSV.mjs
echo "✅ Dados de exemplo inseridos"

echo ""
echo "🎉 Ambiente configurado com sucesso!"
echo ""
echo "Para iniciar o desenvolvimento:"
echo "  npm run dev"
echo ""
echo "URLs disponíveis:"
echo "  🌐 Aplicação: http://localhost:3000"
echo "  🔐 Admin: http://localhost:3000/admin"
echo "  📊 Prisma Studio: npx prisma studio"
echo "  🗄️  Adminer (DB): docker-compose -f docker-compose.dev.yml --profile adminer up -d"
echo ""
echo "Credenciais do admin:"
echo "  Email: admin@floriplanta.com.br"
echo "  Senha: admin123"
echo ""