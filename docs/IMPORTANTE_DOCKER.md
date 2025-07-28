# ⚠️ IMPORTANTE: Uso do Docker para Desenvolvimento

## 🎯 **Para você, desenvolvedor:**

### ✅ **Use SEMPRE Docker:**
```powershell
# ✅ CORRETO - Use isto para desenvolvimento
.\docker-dev.ps1 up
```

### ❌ **NÃO use mais:**
```bash
# ❌ EVITE - Não use mais para desenvolvimento
npm run dev
```

## 🚀 **Comandos Básicos para Memorizar:**

| **Situação** | **Comando** |
|--------------|-------------|
| 🌅 **Começar o dia** | `.\docker-dev.ps1 up` |
| 🌙 **Terminar o dia** | `.\docker-dev.ps1 down` |
| 👀 **Ver o que acontece** | `.\docker-dev.ps1 logs` |
| 🔧 **Algo deu errado** | `.\docker-dev.ps1 build` |

## 🎁 **Benefícios do Docker:**

- ✅ **Ambiente isolado** - Não conflita com outros projetos
- ✅ **PostgreSQL incluído** - Banco sempre rodando e configurado
- ✅ **Dados persistem** - Dados não são perdidos entre sessões
- ✅ **Pronto para produção** - Mesma configuração em todos ambientes
- ✅ **Hot reload funciona** - Mudanças aparecem instantaneamente
- ✅ **Fácil de compartilhar** - Outros devs usam exatamente o mesmo ambiente

## 🎯 **URL Principal:**
http://localhost:3000

## 🔐 **Login Admin:**
- **Email:** admin@floriplanta.com.br
- **Senha:** admin123

## 🆘 **Problemas? Use isto:**

1. **Para e reconstrói tudo:**
```powershell
.\docker-dev.ps1 down
.\docker-dev.ps1 build  
.\docker-dev.ps1 up
```

2. **Se ainda não funcionar:**
```powershell
# Limpa tudo e recomeça
docker system prune -f
.\docker-dev.ps1 build
.\docker-dev.ps1 up
```

**🐳 Lembre-se: Docker = Ambiente profissional e confiável!**