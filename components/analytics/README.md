# Sistema de Tracking GTM - Floriplanta

Este diretório contém a implementação do Google Tag Manager (GTM) para o site da Floriplanta, seguindo as melhores práticas para tracking em aplicações React/Next.js.

## 📋 Componentes

### GTMProvider
Componente principal que inicializa o GTM e envolve toda a aplicação.
- **ID GTM:** `GTM-NT2XKHTD`
- **DataLayer inicial:** website, version, user_type

### PageTracker
Componente que rastreia automaticamente as visualizações de página usando Next.js `usePathname`.

## 🎯 Hook useGTM

Hook personalizado que facilita o envio de eventos para o GTM. Disponibiliza:

### Métodos Principais:

```typescript
const {
  trackPageView,           // Rastrear visualizações de página
  trackUserAction,         // Ações do usuário (cliques, etc.)
  trackFormSubmission,     // Envios de formulários
  trackDownload,           // Downloads de arquivos
  trackNewsletterSignup,   // Inscrições na newsletter
  trackExternalLink,       // Cliques em links externos
  trackCannabisMedicinalEvent, // Eventos específicos de cannabis medicinal
} = useGTM();
```

## 🚀 Exemplos de Uso

### 1. Rastrear Newsletter Signup
```tsx
const { trackNewsletterSignup } = useGTM();

const handleSubmit = (email: string) => {
  trackNewsletterSignup('footer'); // ou 'header', 'modal', etc.
};
```

### 2. Rastrear Links Externos
```tsx
const { trackExternalLink } = useGTM();

<Link 
  href="https://instagram.com/flori.planta"
  onClick={() => trackExternalLink('https://instagram.com/flori.planta', 'Instagram Footer')}
>
  Instagram
</Link>
```

### 3. Rastrear Downloads
```tsx
const { trackDownload } = useGTM();

const handleDownload = () => {
  trackDownload('guia-cannabis-medicinal.pdf', 'PDF');
};
```

### 4. Eventos Específicos de Cannabis Medicinal
```tsx
const { trackCannabisMedicinalEvent } = useGTM();

// Quando usuário visualiza informações sobre um produto
trackCannabisMedicinalEvent('product_view', {
  product_name: 'Óleo CBD Mare',
  product_category: 'oleo_cbd',
});

// Quando usuário busca informações sobre legislação
trackCannabisMedicinalEvent('legislation_search', {
  search_type: 'rdc_anvisa',
});
```

### 5. Formulários de Contato
```tsx
const { trackFormSubmission } = useGTM();

const handleSubmit = async (formData) => {
  try {
    await submitForm(formData);
    trackFormSubmission('contact_form', true);
  } catch (error) {
    trackFormSubmission('contact_form', false, error.message);
  }
};
```

## 📊 Eventos Customizados Configurados

### Eventos Padrão:
- `page_view` - Visualizações de página automáticas
- `user_action` - Ações gerais do usuário
- `form_submission` - Envios de formulários
- `newsletter_signup` - Inscrições na newsletter
- `file_download` - Downloads de arquivos
- `external_link_click` - Cliques em links externos

### Eventos Específicos:
- `cannabis_medicinal_interaction` - Interações relacionadas à cannabis medicinal

## 🛠️ DataLayer Structure

### Dados Automáticos (Page Views):
```javascript
{
  event: 'page_view',
  page_title: 'Título da Página',
  page_location: 'https://floriplanta.com/sobre',
  page_path: '/sobre',
  content_group1: 'categoria',
  content_group2: 'subcategoria'
}
```

### Newsletter Signup:
```javascript
{
  event: 'newsletter_signup',
  signup_source: 'footer' // ou 'header', 'modal', etc.
}
```

### Link Externo:
```javascript
{
  event: 'external_link_click',
  external_url: 'https://instagram.com/flori.planta',
  link_text: 'Instagram Footer'
}
```

## ⚙️ Configuração

1. **Instalação:** Já instalado via `npm install react-gtm-module`
2. **Inicialização:** Automática via `GTMProvider` no layout principal
3. **Uso:** Import do hook `useGTM` nos componentes necessários

## 🔍 Debug

Em desenvolvimento, o GTM exibe logs no console para facilitar o debug. Em produção, esses logs são automaticamente desabilitados.

## 📝 Próximos Passos

Para expandir o tracking, considere implementar:

1. **E-commerce tracking** - Para eventual loja online
2. **User engagement metrics** - Tempo na página, scroll depth
3. **Conversion tracking** - Para objetivos específicos (associação, contatos)
4. **Enhanced e-commerce** - Para produtos de cannabis medicinal

## 🚨 Importante

- Sempre teste os eventos em ambiente de desenvolvimento
- Verifique se os eventos estão sendo enviados corretamente via GTM Debug Mode
- Respeite a LGPD/GDPR para dados pessoais
- Mantenha o dataLayer consistente com a documentação do GTM 