# 🔐 Guia de Setup para Testar Login Localmente

Este guia mostra como configurar o ambiente local para testar a funcionalidade de login da Floriplanta.

## 🚨 Pré-requisitos

### Opção 1: Com Docker (Recomendado)
1. **Docker Desktop** instalado e **RODANDO**
2. **Node.js** (versão 18+)

### Opção 2: PostgreSQL Local
1. **PostgreSQL** instalado localmente
2. **Node.js** (versão 18+)

## 🐳 Opção 1: Setup com Docker

### 1. Verificar Docker Desktop

**IMPORTANTE**: Certifique-se que o Docker Desktop está rodando!

```bash
# Teste se Docker está funcionando
docker --version
docker ps
```

Se der erro, **inicie o Docker Desktop** e aguarde até aparecer "Docker Desktop is running" na bandeja do sistema.

### 2. Configurar Ambiente

```bash
# 1. Instalar dependências
npm install

# 2. Criar arquivo de configuração
cp .env.local.example .env.local

# 3. Iniciar PostgreSQL
npm run docker:dev

# 4. Aguardar PostgreSQL iniciar (30 segundos)
# Verificar se está rodando:
docker ps

# 5. Configurar banco de dados
npm run db:migrate
npm run db:seed

# 6. Iniciar aplicação
npm run dev
```

### 3. Testar Login

1. Acesse: http://localhost:3000/admin/login
2. Use as credenciais:
   - **Email**: admin@floriplanta.com.br
   - **Senha**: admin123

## 💾 Opção 2: PostgreSQL Local (Sem Docker)

### 1. Instalar PostgreSQL

Baixe e instale o PostgreSQL: https://www.postgresql.org/download/windows/

### 2. Criar Banco de Dados

```sql
-- Conecte no PostgreSQL como superuser
CREATE DATABASE floriplanta;
CREATE USER floriplanta WITH PASSWORD 'floriplanta123';
GRANT ALL PRIVILEGES ON DATABASE floriplanta TO floriplanta;
```

### 3. Configurar Ambiente

```bash
# 1. Instalar dependências
npm install

# 2. Criar e editar arquivo de configuração
cp .env.local.example .env.local
```

Edite o `.env.local` e ajuste a URL do banco:
```env
DATABASE_URL=postgresql://floriplanta:floriplanta123@localhost:5432/floriplanta
```

```bash
# 3. Configurar banco de dados
npm run db:migrate
npm run db:seed

# 4. Iniciar aplicação
npm run dev
```

## 🧪 Testando a Funcionalidade de Login

### Cenários de Teste

1. **Login Válido**:
   - Acesse: http://localhost:3000/admin/login
   - Email: admin@floriplanta.com.br
   - Senha: admin123
   - ✅ Deve redirecionar para /admin

2. **Login Inválido**:
   - Use credenciais erradas
   - ✅ Deve mostrar erro

3. **Proteção de Rotas**:
   - Acesse: http://localhost:3000/admin (sem login)
   - ✅ Deve redirecionar para /admin/login

4. **Logout**:
   - Faça login e clique em "Sair"
   - ✅ Deve voltar para login

5. **Sessão Persistente**:
   - Faça login e feche o navegador
   - Reabra e acesse /admin
   - ✅ Deve manter logado

### URLs Importantes

| URL | Descrição |
|-----|-----------|
| http://localhost:3000 | Homepage |
| http://localhost:3000/admin/login | Login |
| http://localhost:3000/admin | Dashboard (protegido) |
| http://localhost:5555 | Prisma Studio (banco) |

## 🔧 Comandos Úteis

```bash
# Gerenciar Docker
npm run docker:dev      # Iniciar PostgreSQL
npm run docker:stop     # Parar serviços
npm run docker:logs     # Ver logs

# Gerenciar Banco
npm run db:studio       # Interface do banco
npm run db:reset        # Resetar banco
npm run db:seed         # Recriar dados

# Desenvolvimento
npm run dev             # Iniciar Next.js
npm run build           # Build produção
```

## 🐛 Problemas Comuns

### Docker não funciona
```bash
# Erro: "The system cannot find the file specified"
# Solução: Inicie o Docker Desktop e aguarde
```

### Porta 3000 ocupada
```bash
# Use porta diferente
PORT=3001 npm run dev
```

### Erro de migração
```bash
# Resete o banco
npm run db:reset
npm run db:seed
```

### Login não funciona
```bash
# Verifique se o usuário existe
npm run db:studio
# Procure na tabela "User"
```

## 📊 Dados de Teste Inclusos

Após executar `npm run db:seed`:

- ✅ **1 usuário admin** (admin@floriplanta.com.br / admin123)
- ✅ **149 termos** da enciclopédia
- ✅ **7 categorias** de blog
- ✅ **15 tags** para posts
- ✅ **5 posts** de exemplo

## 🎯 Próximos Passos

Após configurar o login:

1. **Explore o código**:
   - `lib/auth.ts` - Configuração NextAuth
   - `middleware.ts` - Proteção de rotas
   - `app/admin/login/page.tsx` - Página de login

2. **Customize**:
   - Adicione novos usuários
   - Implemente roles/permissões
   - Customize o design do login

3. **Teste em produção**:
   - Configure variáveis de ambiente
   - Use banco de dados real
   - Configure HTTPS

---

**🎉 Pronto! Agora você pode testar a funcionalidade de login localmente.**

Se tiver problemas, verifique:
1. Docker Desktop está rodando?
2. PostgreSQL está acessível?
3. Variáveis de ambiente estão corretas?
4. Dependências foram instaladas?