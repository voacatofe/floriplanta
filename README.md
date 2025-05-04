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

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse http://localhost:3000 no navegador

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

### Deploy via GitHub Actions para VPS (Hostgator + Easypanel)

O projeto está configurado para deploy automático usando GitHub Actions quando há um push para a branch principal.

#### Pré-requisitos

1. Acesso SSH à VPS no Hostgator
2. Easypanel configurado no servidor
3. Projeto criado no Easypanel

#### Configuração de Secrets no GitHub

Configure os seguintes secrets no seu repositório GitHub em Settings > Secrets and Variables > Actions:

- `SSH_PRIVATE_KEY`: Chave SSH privada para acesso ao servidor
- `SSH_KNOWN_HOSTS`: Resultado do comando `ssh-keyscan <endereço_do_servidor>`
- `SSH_HOST`: Endereço IP ou hostname da VPS
- `SSH_USER`: Nome de usuário SSH
- `EASYPANEL_TOKEN`: Token de API do Easypanel (obtido no painel de administração)
- `EASYPANEL_PROJECT_ID`: ID do projeto no Easypanel
- `EASYPANEL_URL`: URL do seu painel Easypanel (geralmente https://painel.seudominio.com)

#### Arquivos de Configuração

- `.github/workflows/deploy.yml`: Configuração do GitHub Actions
- `Dockerfile`: Configuração para build em container
- `easypanel.config.json`: Configuração do projeto no Easypanel

#### Deploy Manual

Caso precise fazer um deploy manual:

```bash
# Build do projeto
npm run build

# Compactar arquivos
tar -czf build.tar.gz .next public

# Enviar para o servidor
scp build.tar.gz usuario@servidor:~/

# No servidor
cd /opt/easypanel/projects/seu-projeto-id/app
tar -xzf ~/build.tar.gz
rm ~/build.tar.gz
```

Depois, reinicie o projeto no painel do Easypanel. 