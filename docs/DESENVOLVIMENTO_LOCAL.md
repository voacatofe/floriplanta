# 🚀 Desenvolvimento Local - Floriplanta

Guia completo para configurar e executar o projeto Floriplanta localmente usando Docker Desktop.

## 📋 Pré-requisitos

- **Docker Desktop** instalado e rodando
- **Node.js** (versão 18 ou superior)
- **Git** para clonar o repositório

## 🛠️ Configuração Rápida

### Opção 1: Script Automático (Recomendado)

```bash
# PowerShell (Windows)
npm run setup:dev

# Git Bash / WSL / Linux / macOS
npm run setup:dev:bash
```

### Opção 2: Configuração Manual

1. **Clone o repositório** (se ainda não fez):
   ```bash
   git clone <url-do-repositorio>
   cd floriplanta
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edite o arquivo `.env.local` se necessário. As configurações padrão já funcionam para desenvolvimento local.

4. **Inicie o PostgreSQL**:
   ```bash
   npm run docker:dev
   ```

5. **Execute as migrações do banco**:
   ```bash
   npm run db:migrate
   ```

6. **Popule o banco com dados de exemplo**:
   ```bash
   npm run db:seed
   ```

7. **Inicie a aplicação**:
   ```bash
   npm run dev
   ```

## 🌐 URLs Disponíveis

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Aplicação Principal** | http://localhost:3000 | Site da Floriplanta |
| **Admin Dashboard** | http://localhost:3000/admin | Painel administrativo |
| **Login Admin** | http://localhost:3000/admin/login | Página de login |
| **Prisma Studio** | http://localhost:5555 | Interface do banco de dados |
| **Adminer** | http://localhost:8080 | Interface web do PostgreSQL |

## 🔐 Credenciais de Teste

### Usuário Administrador
- **Email**: `admin@floriplanta.com.br`
- **Senha**: `admin123`

### Banco de Dados (PostgreSQL)
- **Host**: `localhost`
- **Porta**: `5432`
- **Database**: `floriplanta`
- **Usuário**: `floriplanta`
- **Senha**: `floriplanta123`

## 🧪 Testando a Funcionalidade de Login

1. **Acesse a página de login**:
   ```
   http://localhost:3000/admin/login
   ```

2. **Faça login com as credenciais**:
   - Email: `admin@floriplanta.com.br`
   - Senha: `admin123`

3. **Teste as funcionalidades**:
   - ✅ Login com credenciais válidas
   - ✅ Redirecionamento para `/admin` após login
   - ✅ Proteção de rotas (tente acessar `/admin` sem login)
   - ✅ Logout
   - ✅ Sessão persistente

## 📊 Dados de Exemplo Inclusos

O banco será populado automaticamente com:

- **1 usuário administrador** para testes de login
- **149 termos da enciclopédia** canábica
- **7 categorias de blog** (Cannabis Medicinal, Cultivo, etc.)
- **15 tags** para organização de conteúdo
- **5 posts de blog** de exemplo

## 🛠️ Scripts Úteis

```bash
# Gerenciamento do Docker
npm run docker:dev      # Inicia PostgreSQL
npm run docker:stop     # Para todos os serviços
npm run docker:logs     # Visualiza logs

# Gerenciamento do Banco
npm run db:migrate      # Executa migrações
npm run db:reset        # Reseta o banco
npm run db:seed         # Popula com dados de exemplo
npm run db:studio       # Abre Prisma Studio

# Desenvolvimento
npm run dev             # Inicia Next.js
npm run build           # Build para produção
npm run lint            # Verifica código
```

## 🔧 Ferramentas de Desenvolvimento

### Prisma Studio
Interface visual para o banco de dados:
```bash
npm run db:studio
# Acesse: http://localhost:5555
```

### Adminer (Opcional)
Interface web completa para PostgreSQL:
```bash
docker-compose -f docker-compose.dev.yml --profile adminer up -d
# Acesse: http://localhost:8080
```

## 🐛 Solução de Problemas

### PostgreSQL não inicia
```bash
# Verifique se a porta 5432 está livre
netstat -an | findstr :5432

# Pare outros serviços PostgreSQL se necessário
# Reinicie o Docker
npm run docker:stop
npm run docker:dev
```

### Erro de migração
```bash
# Resete o banco e tente novamente
npm run db:reset
npm run db:seed
```

### Erro de autenticação
```bash
# Verifique se o usuário admin foi criado
npm run db:studio
# Procure na tabela 'User'
```

### Porta 3000 em uso
```bash
# Use uma porta diferente
PORT=3001 npm run dev
```

## 📁 Estrutura do Projeto

```
floriplanta/
├── app/                    # Next.js App Router
│   ├── admin/             # Painel administrativo
│   ├── api/               # API Routes
│   └── ...
├── components/            # Componentes React
├── lib/                   # Utilitários e configurações
│   ├── auth.ts           # Configuração NextAuth
│   └── ...
├── prisma/               # Schema e migrações
├── scripts/              # Scripts de setup e seed
├── docker-compose.dev.yml # Docker para desenvolvimento
└── .env.local.example    # Variáveis de ambiente
```

## 🚀 Próximos Passos

Após configurar o ambiente local:

1. **Explore o código de autenticação** em `lib/auth.ts`
2. **Teste diferentes cenários** de login/logout
3. **Customize o painel admin** conforme necessário
4. **Adicione novos usuários** via Prisma Studio
5. **Implemente novas funcionalidades** de autenticação

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs: `npm run docker:logs`
2. Consulte a documentação do Next.js e Prisma
3. Verifique se todas as dependências estão instaladas
4. Confirme que o Docker Desktop está rodando

---

**Pronto para desenvolver! 🎉**

O ambiente local está configurado e você pode começar a testar e desenvolver a funcionalidade de login da Floriplanta.