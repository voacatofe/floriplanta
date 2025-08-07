# Guia de Migração para WordPress Headless

Este guia explica como usar o sistema de Content Providers para migrar gradualmente do Prisma/PostgreSQL para WordPress Headless.

## 🎯 Visão Geral

O sistema de Content Providers permite você:
- **Manter seu sistema atual funcionando** enquanto migra gradualmente
- **Testar WordPress** sem quebrar nada
- **Usar ambos os sistemas** simultaneamente (modo híbrido)
- **Migrar completamente** quando estiver pronto

## 📋 Configuração

### 1. Variáveis de Ambiente

Adicione ao seu `.env.local`:

```env
# Provider de conteúdo: 'prisma' | 'wordpress' | 'hybrid'
CONTENT_PROVIDER=prisma

# Configurações do WordPress (se usar)
WORDPRESS_API_URL=https://seu-wordpress.com
WORDPRESS_USE_GRAPHQL=false

# Configurações específicas do modo híbrido
USE_WORDPRESS_FOR_POSTS=false
```

### 2. Modos de Operação

#### Modo Prisma (Padrão)
```env
CONTENT_PROVIDER=prisma
```
- Usa apenas o banco PostgreSQL atual
- Nenhuma mudança no comportamento

#### Modo WordPress
```env
CONTENT_PROVIDER=wordpress
WORDPRESS_API_URL=https://seu-wordpress.com
```
- Usa apenas WordPress como fonte de dados
- Ideal após migração completa

#### Modo Híbrido
```env
CONTENT_PROVIDER=hybrid
WORDPRESS_API_URL=https://seu-wordpress.com
USE_WORDPRESS_FOR_POSTS=true
```
- Combina dados de ambas as fontes
- Permite migração gradual

## 🚀 Como Usar

### 1. Em Server Components

```typescript
import { getContentProvider } from '@/lib/content-providers';

export default async function BlogPage() {
  const provider = getContentProvider();
  
  // Buscar posts - funciona com qualquer provider
  const { posts, totalCount } = await provider.getPosts({
    page: 1,
    perPage: 10,
    published: true
  });
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      ))}
    </div>
  );
}
```

### 2. Em Client Components

```typescript
'use client';

import { usePosts } from '@/hooks/useContent';

export default function BlogList() {
  const { posts, loading, error } = usePosts({
    page: 1,
    perPage: 10,
    published: true
  });
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}
```

## 🔄 Estratégia de Migração Recomendada

### Fase 1: Preparação
1. Instale o WordPress em um subdomínio (ex: `blog.seusite.com`)
2. Configure o plugin **WPGraphQL** (opcional)
3. Teste a API REST do WordPress

### Fase 2: Teste Local
1. Configure `CONTENT_PROVIDER=wordpress` localmente
2. Teste se tudo funciona corretamente
3. Identifique possíveis problemas

### Fase 3: Modo Híbrido
1. Configure `CONTENT_PROVIDER=hybrid` em produção
2. Migre conteúdo gradualmente
3. Mantenha posts antigos no Prisma
4. Crie novos posts no WordPress

### Fase 4: Migração Completa
1. Migre todo conteúdo para WordPress
2. Configure `CONTENT_PROVIDER=wordpress`
3. Remova dependências do Prisma (opcional)

## 🔧 Recursos Avançados

### Provider Customizado

Você pode criar seu próprio provider:

```typescript
import { ContentProvider } from '@/lib/content-providers/types';

export class CustomProvider implements ContentProvider {
  async getPosts(options) {
    // Sua implementação
  }
  
  // ... outros métodos
}
```

### Cache e Performance

O sistema respeita as configurações de cache do Next.js:

```typescript
// Em wordpress-provider.ts
const response = await fetch(url, {
  next: { 
    revalidate: 3600, // Cache por 1 hora
    tags: ['posts']   // Para revalidação sob demanda
  }
});
```

### Transformação de Dados

Os providers convertem automaticamente:
- EditorJS → HTML (Prisma)
- WordPress HTML → HTML limpo
- Metadados específicos de cada plataforma

## 📝 Exemplos de Uso

### Buscar Post por Slug
```typescript
const provider = getContentProvider();
const post = await provider.getPostBySlug('meu-post');
```

### Buscar Categorias
```typescript
const categories = await provider.getCategories();
```

### Buscar Posts por Categoria
```typescript
const { posts } = await provider.getPosts({
  categorySlug: 'tecnologia',
  page: 1
});
```

## ⚠️ Considerações Importantes

1. **IDs diferentes**: WordPress usa números, Prisma usa strings UUID
2. **Autenticação**: O sistema mantém NextAuth para admin
3. **Uploads**: Considere onde armazenar imagens
4. **SEO**: URLs podem mudar - configure redirects
5. **Comentários**: Implemente separadamente se necessário

## 🛠️ Troubleshooting

### Erro: "WordPress API error"
- Verifique se a URL está correta
- Confirme se a API REST está habilitada
- Teste no Postman: `https://seu-wordpress.com/wp-json/wp/v2/posts`

### Posts não aparecem
- Verifique o status de publicação
- Confirme permissões da API
- Use `_embed=true` para incluir dados relacionados

### Performance lenta
- Implemente cache no WordPress
- Use CDN para imagens
- Configure `revalidate` apropriadamente

## 🎉 Benefícios da Abordagem

1. **Sem downtime** durante migração
2. **Rollback fácil** se necessário
3. **Testes seguros** em produção
4. **Flexibilidade** para escolher o melhor de cada sistema
5. **Migração gradual** no seu próprio ritmo