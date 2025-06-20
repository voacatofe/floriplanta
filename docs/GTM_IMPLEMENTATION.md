# Implementação do Google Tag Manager (GTM)

## Visão Geral

O Google Tag Manager foi implementado no projeto Floriplanta usando o pacote `react-gtm-module` seguindo as melhores práticas para aplicações React/Next.js.

**GTM ID:** GTM-NT2XKHTD

## Estrutura de Implementação

### 1. Arquivos Principais

- **`app/lib/gtm.ts`**: Configuração central do GTM e definição de eventos
- **`hooks/useGTM.ts`**: Hook customizado para facilitar o tracking
- **`components/GTMInitializer.tsx`**: Componente para inicializar o GTM
- **`components/PageTracker.tsx`**: Componente para tracking automático de páginas

### 2. Eventos Predefinidos

Os seguintes eventos estão configurados e prontos para uso:

#### Navegação
- `page_view`: Visualização de página
  - Parâmetros: `page_name`, `page_category`

#### Interações
- `click_button`: Clique em botões
  - Parâmetros: `button_name`, `click_location`

#### Formulários
- `form_start`: Início de preenchimento de formulário
  - Parâmetros: `form_name`
- `form_submit`: Envio de formulário
  - Parâmetros: `form_name`, `form_data`

#### Newsletter
- `newsletter_subscribe`: Inscrição na newsletter
  - Parâmetros: `user_email`, `subscribe_location`

#### Contato
- `contact_click`: Clique em links de contato
  - Parâmetros: `contact_type` (whatsapp/email/phone), `click_location`

#### Blog
- `blog_post_view`: Visualização de post do blog
  - Parâmetros: `post_title`, `post_category`, `post_author`
- `blog_post_share`: Compartilhamento de post
  - Parâmetros: `post_title`, `share_method`

#### Associação
- `association_start`: Início do processo de associação
- `association_complete`: Conclusão da associação
  - Parâmetros: `membership_type`

#### Produtos
- `product_view`: Visualização de produto
  - Parâmetros: `product_name`, `product_category`

## Como Usar

### 1. Tracking de Páginas

Adicione o componente `PageTracker` no início de cada página:

```tsx
import PageTracker from '@/components/PageTracker';

export default function MinhaPage() {
  return (
    <>
      <PageTracker pageName="Nome da Página" pageCategory="Categoria" />
      {/* Resto do conteúdo */}
    </>
  );
}
```

### 2. Tracking de Eventos com Hook

Use o hook `useGTM` em componentes cliente:

```tsx
'use client';
import { useGTM } from '@/hooks/useGTM';

export default function MeuComponente() {
  const { trackButtonClick, trackFormSubmit } = useGTM();

  const handleClick = () => {
    trackButtonClick('Nome do Botão', 'header');
    // Lógica do botão
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmit('Formulário de Contato', { nome: 'João' });
    // Lógica do formulário
  };

  return (
    <button onClick={handleClick}>Clique aqui</button>
  );
}
```

### 3. Tracking de Eventos Customizados

Para eventos não predefinidos:

```tsx
const { trackEvent } = useGTM();

trackEvent({
  event: 'meu_evento_customizado',
  parametro1: 'valor1',
  parametro2: 'valor2'
});
```

## Exemplos de Implementação

### Footer (Já Implementado)
- Tracking de cliques em WhatsApp e email
- Tracking de inscrição na newsletter

### Blog Post
```tsx
// Em app/blog/[slug]/page.tsx
<PageTracker 
  pageName={post.title} 
  pageCategory="Blog" 
/>

// Para compartilhamento
const handleShare = (method: string) => {
  trackBlogPostShare(post.title, method);
  // Lógica de compartilhamento
};
```

### Página de Produtos
```tsx
// Em app/oleos/[produto]/page.tsx
useEffect(() => {
  trackProductView('Óleo CBD 1000mg', 'Óleos');
}, []);
```

## Configuração no GTM

### 1. Variáveis Recomendadas
- **DL - event**: `{{Event}}`
- **DL - page_name**: `{{Page Name}}`
- **DL - button_name**: `{{Button Name}}`
- **DL - form_name**: `{{Form Name}}`

### 2. Triggers Sugeridos
- **Page View**: `event equals page_view`
- **Button Click**: `event equals click_button`
- **Form Submit**: `event equals form_submit`
- **Contact Click**: `event equals contact_click`

### 3. Tags Recomendadas
- **GA4 - Page View**: Disparar em todas as páginas
- **GA4 - Button Interactions**: Disparar em cliques de botões
- **GA4 - Form Tracking**: Disparar em submissões de formulário
- **GA4 - Contact Interactions**: Disparar em cliques de contato

## Melhores Práticas

1. **Sempre use eventos predefinidos** quando possível para manter consistência
2. **Nomeie elementos de forma descritiva** (ex: "Botão CTA Hero" em vez de "Botão 1")
3. **Inclua localização** nos eventos (ex: "header", "footer", "sidebar")
4. **Evite PII** (Informações Pessoais Identificáveis) nos eventos
5. **Teste no Preview Mode** do GTM antes de publicar
6. **Use dataLayer.push** apenas através das funções fornecidas
7. **Siga as convenções de formulários** - veja [GTM_FORM_CONVENTIONS.md](./GTM_FORM_CONVENTIONS.md)

### Formulários
- Sempre adicione `id` único no formato `[tipo]-form-[localização]`
- Use `name="email"` para campos de email
- Adicione `name="submit"` nos botões de envio
- Veja exemplos completos em [GTM_FORM_CONVENTIONS.md](./GTM_FORM_CONVENTIONS.md)

## Debugging

Para debugar eventos GTM:

1. Instale a extensão [Google Tag Assistant](https://tagassistant.google.com/)
2. Ative o Preview Mode no GTM
3. Verifique os eventos no console:
   ```javascript
   window.dataLayer
   ```

## Próximos Passos

1. Implementar tracking em todas as páginas principais
2. Adicionar tracking de scroll depth
3. Implementar Enhanced Ecommerce para produtos
4. Configurar eventos de conversão
5. Adicionar tracking de tempo na página
6. Implementar tracking de erros JavaScript

## Suporte

Para dúvidas sobre a implementação do GTM, consulte:
- [Documentação do react-gtm-module](https://www.npmjs.com/package/react-gtm-module)
- [Google Tag Manager Help Center](https://support.google.com/tagmanager)
- [GTM Developer Guide](https://developers.google.com/tag-manager) 