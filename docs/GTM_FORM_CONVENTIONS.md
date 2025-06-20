# Convenções de Formulários para GTM

## Por que IDs e Names são importantes?

O Google Tag Manager precisa de identificadores únicos e consistentes para:
1. **Identificar formulários específicos** através de triggers
2. **Extrair valores de campos** de forma confiável
3. **Evitar conflitos** entre diferentes formulários
4. **Simplificar a configuração** no GTM

## Convenções de Nomenclatura

### 1. IDs de Formulários

Todos os formulários devem ter um ID único seguindo o padrão:
```html
id="[tipo]-form-[localização]"
```

**Exemplos:**
- `id="nl-form-footer"` - Newsletter no footer
- `id="nl-form-hero"` - Newsletter no hero
- `id="contact-form-main"` - Formulário de contato principal
- `id="association-form-step1"` - Formulário de associação etapa 1
- `id="search-form-header"` - Busca no header

### 2. Names dos Campos

Use names descritivos e consistentes:
```html
name="[nome_do_campo]"
```

**Campos comuns:**
- `name="email"` - Sempre use "email" para campos de email
- `name="name"` ou `name="full_name"` - Nome completo
- `name="phone"` - Telefone
- `name="message"` - Mensagem/Comentário
- `name="subject"` - Assunto
- `name="cpf"` - CPF
- `name="submit"` - Botão de envio

### 3. Exemplos Completos

#### Newsletter
```tsx
<form id="nl-form-footer" onSubmit={handleSubmit}>
  <input 
    id="footer-email"
    name="email"
    type="email"
    required
  />
  <button type="submit" name="submit">
    Inscrever
  </button>
</form>
```

#### Contato
```tsx
<form id="contact-form-main">
  <input name="name" type="text" required />
  <input name="email" type="email" required />
  <input name="phone" type="tel" />
  <textarea name="message" required />
  <button type="submit" name="submit">
    Enviar
  </button>
</form>
```

#### Associação
```tsx
<form id="association-form-step1">
  <input name="full_name" type="text" required />
  <input name="cpf" type="text" required />
  <input name="email" type="email" required />
  <input name="phone" type="tel" required />
  <select name="membership_type">
    <option value="patient">Paciente</option>
    <option value="caregiver">Cuidador</option>
  </select>
  <button type="submit" name="submit">
    Próximo
  </button>
</form>
```

## Configuração no GTM

### 1. Trigger para Formulário Específico
```javascript
Trigger Type: Form Submission
This trigger fires on: Some Forms
Fire this trigger when:
  Form ID equals nl-form-footer
```

### 2. Variável para Capturar Email
```javascript
Variable Type: DOM Element
Selection Method: CSS Selector
Element Selector: #nl-form-footer input[name="email"]
Attribute Name: value
```

### 3. JavaScript Customizado para Múltiplos Campos
```javascript
function() {
  var form = document.getElementById('contact-form-main');
  if (form) {
    return {
      name: form.elements['name'].value,
      email: form.elements['email'].value,
      phone: form.elements['phone'].value || '',
      message: form.elements['message'].value
    };
  }
  return undefined;
}
```

## Checklist para Novos Formulários

- [ ] Formulário tem `id` único seguindo a convenção
- [ ] Todos os campos têm `name` apropriado
- [ ] Campos de email sempre usam `name="email"`
- [ ] Botão submit tem `name="submit"`
- [ ] ID não conflita com outros elementos da página
- [ ] Implementado tracking com `useGTM` hook
- [ ] Testado no Preview Mode do GTM

## Formulários Implementados

| Formulário | ID | Localização | Status |
|------------|-----|-------------|---------|
| Newsletter Footer | `nl-form-footer` | Footer | ✅ Implementado |
| Newsletter Hero | `nl-form-hero` | Home/Hero | ⏳ Pendente |
| Contato Principal | `contact-form-main` | /contato | ✅ Implementado |
| Associação | `association-form-*` | /associar | ⏳ Pendente |
| Busca | `search-form-header` | Header | ⏳ Pendente |

## Notas Importantes

1. **Evite IDs genéricos** como `form`, `newsletter`, `contact`
2. **Seja específico** sobre a localização quando houver múltiplos formulários similares
3. **Mantenha consistência** - se usar underscore, use em todos (ex: `full_name`, não misture com `fullName`)
4. **Documente** novos formulários nesta lista
5. **Teste sempre** no GTM Preview Mode antes de publicar 