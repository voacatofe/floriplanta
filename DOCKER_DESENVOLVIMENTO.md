# 🐳 Ambiente de Desenvolvimento Docker - Floriplanta

Guia completo para executar a Floriplanta em containers Docker para desenvolvimento.

## 📋 Pré-requisitos

- **Docker Desktop** instalado e rodando
- **Git** para clonar o repositório
- **PowerShell** (Windows) ou **Bash** (Linux/Mac)

## 🚀 Início Rápido

### Opção 1: Script PowerShell (Recomendado para Windows)

```powershell
# Iniciar ambiente completo
.\docker-dev.ps1 up

# Ver logs em tempo real
.\docker-dev.ps1 logs

# Parar ambiente
.\docker-dev.ps1 down
```

### Opção 2: NPM Scripts

```bash
# Iniciar ambiente
npm run docker:dev

# Ver logs
npm run docker:logs

# Parar ambiente
npm run docker:stop
```

### Opção 3: Docker Compose Direto

```bash
# Iniciar
docker-compose -f docker-compose.dev.yml up -d

# Parar
docker-compose -f docker-compose.dev.yml down
```

## 🌐 URLs Disponíveis

Após iniciar o ambiente:

- **🌱 Aplicação Floriplanta**: http://localhost:3000
- **🔐 Login Admin**: http://localhost:3000/admin/login
- **🗄️ Adminer** (opcional): http://localhost:8080

## 🔑 Credenciais de Teste

### Usuário Administrador
- **Email**: `admin@floriplanta.com.br`
- **Senha**: `admin123`

### Banco de Dados (Adminer)
- **Sistema**: PostgreSQL
- **Servidor**: `postgres` (ou `localhost` se acessar externamente)
- **Usuário**: `floriplanta`
- **Senha**: `floriplanta123`
- **Base de dados**: `floriplanta`

## 🛠️ Comandos Úteis

### Script PowerShell (`docker-dev.ps1`)

```powershell
# Ver ajuda completa
.\docker-dev.ps1 help

# Reconstruir imagens
.\docker-dev.ps1 build

# Acessar shell do container da app
.\docker-dev.ps1 shell

# Acessar PostgreSQL
.\docker-dev.ps1 db

# Executar seeds
.\docker-dev.ps1 seed
```

### NPM Scripts

```bash
# Reconstruir imagens
npm run docker:build

# Acessar shell do container
npm run docker:shell

# Acessar PostgreSQL
npm run docker:db

# Executar seeds no container
npm run docker:seed

# Iniciar Adminer
npm run docker:adminer
```

### Docker Compose Avançado

```bash
# Iniciar com Adminer
docker-compose -f docker-compose.dev.yml --profile adminer up -d

# Reconstruir apenas a aplicação
docker-compose -f docker-compose.dev.yml build app

# Ver logs de um serviço específico
docker-compose -f docker-compose.dev.yml logs -f app
docker-compose -f docker-compose.dev.yml logs -f postgres

# Reiniciar apenas um serviço
docker-compose -f docker-compose.dev.yml restart app
```

## 🔄 Fluxo de Desenvolvimento

### 1. Primeira Execução

```powershell
# Clone o repositório (se ainda não fez)
git clone <url-do-repo>
cd floriplanta

# Inicie o ambiente
.\docker-dev.ps1 up

# Execute os seeds (primeira vez)
.\docker-dev.ps1 seed

# Acesse http://localhost:3000
```

### 2. Desenvolvimento Diário

```powershell
# Iniciar ambiente
.\docker-dev.ps1 up

# Desenvolver normalmente...
# Os arquivos são sincronizados automaticamente

# Ver logs se necessário
.\docker-dev.ps1 logs

# Parar ao final do dia
.\docker-dev.ps1 down
```

### 3. Após Mudanças no Dockerfile ou Dependencies

```powershell
# Parar ambiente
.\docker-dev.ps1 down

# Reconstruir imagens
.\docker-dev.ps1 build

# Iniciar novamente
.\docker-dev.ps1 up
```

## 📁 Estrutura dos Containers

### Container da Aplicação (`floriplanta-app-dev`)
- **Imagem**: Baseada em `node:20-alpine`
- **Porta**: 3000
- **Volumes**: Código sincronizado em tempo real
- **Comando**: `npm run dev` (hot reload ativo)

### Container PostgreSQL (`floriplanta-postgres-dev`)
- **Imagem**: `postgres:15-alpine`
- **Porta**: 5432
- **Volume**: Dados persistentes em `postgres_dev_data`
- **Health Check**: Verifica se está pronto para conexões

### Container Adminer (`floriplanta-adminer`) - Opcional
- **Imagem**: `adminer:latest`
- **Porta**: 8080
- **Ativação**: `--profile adminer`

## 🐛 Solução de Problemas

### Problema: Docker não está rodando
```
❌ Docker não está rodando. Inicie o Docker Desktop primeiro.
```
**Solução**: Abra o Docker Desktop e aguarde inicializar.

### Problema: Porta já em uso
```
Error: Port 3000 is already in use
```
**Solução**: 
```powershell
# Pare outros serviços na porta 3000
.\docker-dev.ps1 down

# Ou mude a porta no docker-compose.dev.yml
```

### Problema: Container não inicia
```powershell
# Ver logs detalhados
.\docker-dev.ps1 logs

# Reconstruir imagem
.\docker-dev.ps1 build
```

### Problema: Banco de dados vazio
```powershell
# Execute os seeds
.\docker-dev.ps1 seed

# Ou acesse o container e execute manualmente
.\docker-dev.ps1 shell
npm run db:seed
```

### Problema: Mudanças no código não aparecem
- Verifique se o volume está montado corretamente
- Reinicie o container: `docker-compose -f docker-compose.dev.yml restart app`

## 🔧 Configurações Avançadas

### Variáveis de Ambiente

As variáveis são definidas no `docker-compose.dev.yml`:

```yaml
environment:
  - NODE_ENV=development
  - DATABASE_URL=postgresql://floriplanta:floriplanta123@postgres:5432/floriplanta
  - NEXTAUTH_URL=http://localhost:3000
  - NEXTAUTH_SECRET=floriplanta-secret-key-for-development
  - NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Volumes

- **Código fonte**: `.:/app` (sincronização bidirecional)
- **node_modules**: `/app/node_modules` (volume anônimo para performance)
- **Build cache**: `/app/.next` (volume anônimo para performance)
- **Dados PostgreSQL**: `postgres_dev_data` (volume nomeado persistente)

## 📊 Dados de Exemplo

O ambiente inclui dados de teste:

- **1 usuário administrador**
- **149 termos** da enciclopédia
- **7 categorias** de blog
- **15 tags** de blog
- **5 posts** de blog de exemplo

## 🚀 Próximos Passos

1. **Teste o login**: http://localhost:3000/admin/login
2. **Explore o admin**: Gerencie posts, categorias e enciclopédia
3. **Desenvolva**: Modifique o código e veja as mudanças em tempo real
4. **Use o Adminer**: Explore o banco de dados em http://localhost:8080

## 📝 Notas Importantes

- ✅ **Hot Reload**: Mudanças no código são refletidas automaticamente
- ✅ **Dados Persistentes**: O banco PostgreSQL mantém os dados entre reinicializações
- ✅ **Isolamento**: Cada serviço roda em seu próprio container
- ✅ **Performance**: Volumes otimizados para `node_modules` e `.next`
- ⚠️ **Primeira execução**: Pode demorar mais devido ao build da imagem
- ⚠️ **Recursos**: Certifique-se de ter recursos suficientes no Docker Desktop

---

**🌱 Floriplanta - Ambiente de Desenvolvimento Containerizado**