# Floriplanta - Site Institucional

Site institucional para a Floriplanta, uma associação canábica dedicada à educação, pesquisa e acesso à cannabis medicinal.

## Sobre o Projeto

O site da Floriplanta foi desenvolvido com o objetivo de:

- Informar sobre a associação e seus objetivos
- Destacar os benefícios da cannabis medicinal
- Fornecer um processo simples para novos associados
- Apresentar uma loja online (em breve)

## Tecnologias Utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Instalação e Execução

### 🐳 Desenvolvimento com Docker (Recomendado)

**Pré-requisitos:** Docker Desktop instalado e rodando

```powershell
# 1. Clone o repositório
git clone [url-do-repositorio]
cd floriplanta

# 2. Inicie o ambiente Docker
.\docker-dev.ps1 up

# 3. Carregue dados de teste (primeira vez)
.\docker-dev.ps1 seed

# 4. Acesse http://localhost:3000
```

**Login Admin:** admin@floriplanta.com.br / admin123

**Comandos úteis:**
- `.\docker-dev.ps1 logs` - Ver logs
- `.\docker-dev.ps1 down` - Parar ambiente
- `.\docker-dev.ps1 build` - Rebuild após mudanças

📖 **Guia completo:** [docs/GUIA_DOCKER_DESENVOLVIMENTO.md](docs/GUIA_DOCKER_DESENVOLVIMENTO.md)

### 💻 Desenvolvimento Local (Alternativo)

```bash
# 1. Clone o repositório
git clone [url-do-repositorio]

# 2. Instale as dependências
npm install

# 3. Execute o servidor de desenvolvimento
npm run dev

# 4. Acesse http://localhost:3000
```

## Estrutura do Projeto

- `app/`: Páginas e componentes da aplicação
- `app/components/`: Componentes reutilizáveis (Header, Footer, etc.)
- `public/`: Recursos estáticos (imagens, ícones, etc.)
- `public/fonts/`: Fontes personalizadas
- `public/Brandbook/`: Guia de marca da Floriplanta

## Cores e Fontes

O site utiliza as seguintes cores principais:
- Verde limão: #d1d376 (primary)
- Roxo: #b39ccb (secondary)
- Escuro: #333333 (dark)
- Claro: #f9f9f9 (light)

Fontes:
- Futuru: Fonte principal para textos
- Behind-The-Nineties: Fonte para títulos e destaques

## Contribuição

Para contribuir com o projeto, siga os seguintes passos:

1. Crie um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova feature'`)
4. Envie para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença [inserir licença].

## Deploy

### Auto-Deploy do Easypanel

O projeto está configurado para deploy automático usando o recurso de Auto-Deploy do Easypanel.

#### Pré-requisitos

1. Acesso SSH à VPS no Hostgator
2. Easypanel configurado no servidor
3. GitHub Personal Access Token

#### Configuração do Auto-Deploy

1. **Gerar um Personal Access Token no GitHub**
   - Acesse Settings → Developer settings → Tokens e gere um token classic ou fine-grained com ao menos os escopos `repo` e `admin:repo_hook`
   - Copie o valor; ele não será exibido novamente.

2. **Adicionar o token no Easypanel**
   - Dentro do painel vá em Settings → GitHub e cole o token; salve e verifique a mensagem "GitHub token updated"

3. **Vincular o repositório ao seu App Service**
   - Crie (ou abra) o project → service que você já criou.
   - Em Source selecione GitHub repository, informe owner/repo e a branch main
   - Se existir Dockerfile, ele usará; se não, o Easypanel detecta a stack com Buildpacks

4. **Deploy inicial**
   - Clique Deploy para garantir que a imagem constrói e sobe sem erros
   - Configure porta, domínio e variáveis .env conforme necessário

5. **Ativar Auto Deploy**
   - No topo da página do serviço, habilite Auto Deploy
   - O Easypanel cria automaticamente um webhook no repositório
   - Cada push na branch configurada aciona novo build e rolling update

6. **Testar**
   - Faça um commit trivial e git push
   - No Easypanel, aba Deployments, você verá o build rodando em segundos
   - Ao final, o container é trocado sem downtime

#### Vantagens

- Zero YAML: você não escreve nenhum workflow
- Rollback rápido: cada build vira um release listado na interface
- Menos sobrecarga de VPS: tudo roda em containers isolados gerenciados pelo painel 