# 🐳 Guia Rápido - Docker para Desenvolvimento

## 🚀 Iniciar Projeto (3 comandos)

### **Opção 1: PowerShell (Recomendado Windows)**
```powershell
# 1. Iniciar todos os serviços
.\docker-dev.ps1 up

# 2. Carregar dados de teste (só na primeira vez)
.\docker-dev.ps1 seed

# 3. Pronto! Acesse: http://localhost:3000
```

### **Opção 2: NPM Scripts**
```bash
# 1. Iniciar ambiente
npm run docker:dev

# 2. Carregar dados de teste (só na primeira vez)  
npm run docker:seed

# 3. Pronto! Acesse: http://localhost:3000
```

## 🌐 URLs e Credenciais

**URLs:**
- 🌱 **Aplicação**: http://localhost:3000
- 🔐 **Admin**: http://localhost:3000/admin/login
- 🗄️ **Banco (Adminer)**: http://localhost:8080 (opcional)

**Login Admin:**
- **Email**: `admin@floriplanta.com.br`
- **Senha**: `admin123`

## 📋 Comandos Essenciais

| **Ação** | **PowerShell** | **NPM** |
|----------|----------------|---------|
| ▶️ Iniciar | `.\docker-dev.ps1 up` | `npm run docker:dev` |
| ⏹️ Parar | `.\docker-dev.ps1 down` | `npm run docker:stop` |
| 📋 Ver Logs | `.\docker-dev.ps1 logs` | `npm run docker:logs` |
| 🔨 Rebuild | `.\docker-dev.ps1 build` | `npm run docker:build` |
| 🐚 Shell Container | `.\docker-dev.ps1 shell` | `npm run docker:shell` |

## 🔄 Fluxo Diário

```powershell
# Manhã - Iniciar trabalho
.\docker-dev.ps1 up

# Desenvolvimento...
# ✅ Hot reload automático
# ✅ Mudanças refletem instantaneamente
# ✅ Banco de dados persistente

# Fim do dia - Parar
.\docker-dev.ps1 down
```

## 🛠️ Solução Rápida de Problemas

**Docker não roda:**
```powershell
# Abra Docker Desktop primeiro, depois:
.\docker-dev.ps1 up
```

**Código não atualiza:**
```powershell
# Rebuild do container:
.\docker-dev.ps1 down
.\docker-dev.ps1 build
.\docker-dev.ps1 up
```

**Porta 3000 ocupada:**
```powershell
# Pare outros serviços primeiro:
.\docker-dev.ps1 down
```

## 🏗️ Para Produção Futura

Sua configuração já está preparada para produção! 🎯

- ✅ **Multi-stage builds** prontos
- ✅ **docker-compose.yml** existe para produção  
- ✅ **Volumes otimizados** para performance
- ✅ **Health checks** configurados
- ✅ **Variáveis de ambiente** organizadas

## 📝 Próximos Passos

1. **Teste agora**: `.\docker-dev.ps1 up`
2. **Acesse**: http://localhost:3000
3. **Faça login**: admin@floriplanta.com.br / admin123
4. **Desenvolva**: Mudanças aparecem automaticamente!

**🌱 Seu ambiente Docker está pronto para desenvolvimento profissional!**