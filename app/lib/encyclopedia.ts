/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Reimplementar com novo banco de dados - Supabase removido
// import { createSupabaseServerClient } from './supabase/server';
import type { 
  DefinedTermSet, 
  Organization, 
  FAQPage, 
  Question, 
  Answer, 
  Thing,
  URL 
} from 'schema-dts'; 

export type EncyclopediaCategory = 'Saúde' | 'Química' | 'Legislação';

export interface EncyclopediaTerm {
  id: string;
  term: string;
  slug: string;
  definition: string;
  category: EncyclopediaCategory;
  related_terms: string[]; // Array simples de nomes de termos
  created_at: string;
  updated_at: string;
  is_active: boolean;
  meta_description?: string;
}

export interface EncyclopediaSearchResult {
  terms: EncyclopediaTerm[];
  totalCount: number;
  categories: { category: EncyclopediaCategory; count: number }[];
}

// Função para normalizar slugs (remover acentos e formatação)
export function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '-')     // Substitui caracteres especiais por hífen
    .replace(/^-+|-+$/g, '')         // Remove hífens do início e fim
    .replace(/-+/g, '-');            // Substitui múltiplos hífens por um só
}

// TODO: Reimplementar com novo banco de dados
/*
export async function getAllTerms(
  page = 1,
  pageSize = 20,
  category?: EncyclopediaCategory,
  searchQuery?: string
): Promise<EncyclopediaSearchResult> {
  const supabase = await createSupabaseServerClient();
  
  let query = (supabase as any)
    .from('encyclopedia_terms')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .order('term');

  if (category) {
    query = query.eq('category', category);
  }

  if (searchQuery) {
    query = query.or(`term.ilike.%${searchQuery}%,definition.ilike.%${searchQuery}%`);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data: terms, error, count } = await query;

  if (error) {
    console.error('Erro ao buscar termos:', error);
    return { terms: [], totalCount: 0, categories: [] };
  }

  // Buscar contagem por categoria
  const { data: categoryData } = await (supabase as any)
    .from('encyclopedia_terms')
    .select('category')
    .eq('is_active', true);

  const categoryCounts: Record<string, number> = {};
  categoryData?.forEach((term: any) => {
    categoryCounts[term.category] = (categoryCounts[term.category] || 0) + 1;
  });

  const categories = Object.entries(categoryCounts).map(([category, count]) => ({ 
    category: category as EncyclopediaCategory, 
    count: count as number
  }));

  return {
    terms: terms || [],
    totalCount: count || 0,
    categories
  };
}
*/

// TODO: Reimplementar com novo banco de dados
/*
export async function getTermBySlug(slug: string): Promise<EncyclopediaTerm | null> {
  const supabase = await createSupabaseServerClient();
  
  // Normalizar o slug para busca consistente
  const normalizedSlug = normalizeSlug(slug);
  
  const { data, error } = await (supabase as any)
    .from('encyclopedia_terms')
    .select('*')
    .eq('slug', normalizedSlug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Erro ao buscar termo:', error);
    return null;
  }

  return data;
}

// Função para buscar termos relacionados (MODIFICADA para buscar por SLUGS)
export async function getRelatedTerms(relatedSlugs: string[]): Promise<EncyclopediaTerm[]> {
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await (supabase as any)
    .from('encyclopedia_terms')
    .select('*')
    .in('slug', relatedSlugs) // Alterado de 'term' para 'slug'
    .eq('is_active', true)
    .order('term');

  if (error) {
    console.error('Erro ao buscar termos relacionados por slugs:', error);
    return [];
  }

  return data || [];
}

// Função para buscar termo por nome exato (útil para links)
export async function getTermByName(termName: string): Promise<EncyclopediaTerm | null> {
  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await (supabase as any)
    .from('encyclopedia_terms')
    .select('*')
    .eq('term', termName)
    .eq('is_active', true)
    .single();

  if (error) {
    return null; // Termo não encontrado
  }

  return data;
}

// Função para buscar múltiplos termos por nome (para validação)
export async function getTermsByNames(termNames: string[]): Promise<EncyclopediaTerm[]> {
  if (!termNames || termNames.length === 0) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await (supabase as any)
    .from('encyclopedia_terms')
    .select('*')
    .in('term', termNames)
    .eq('is_active', true);

  if (error) {
    console.error('Erro ao buscar termos por nomes:', error);
    return [];
  }

  return data || [];
}

export async function searchTerms(query: string): Promise<EncyclopediaTerm[]> {
  const supabase = await createSupabaseServerClient();
  
  // Busca simples por nome e definição
  const { data, error } = await (supabase as any)
    .from('encyclopedia_terms')
    .select('*')
    .or(`term.ilike.%${query}%,definition.ilike.%${query}%`)
    .eq('is_active', true)
    .limit(10);

  if (error) {
    console.error('Erro na busca:', error);
    return [];
  }

  return data || [];
}

// Função para buscar por categoria
export async function getTermsByCategory(category: EncyclopediaCategory): Promise<EncyclopediaTerm[]> {
  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await (supabase as any)
    .from('encyclopedia_terms')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('term');

  if (error) {
    console.error('Erro ao buscar termos por categoria:', error);
    return [];
  }

  return data || [];
}
*/

// Função para converter texto com links automáticos
export function processDefinitionWithLinks(definition: string, relatedTerms: EncyclopediaTerm[]): string {
  let processedDefinition = definition;
  
  // Criar um mapa de termo -> slug para busca rápida
  const termMap = new Map();
  relatedTerms.forEach(term => {
    termMap.set(term.term.toLowerCase(), term.slug);
  });
  
  // Substituir menções dos termos relacionados por links
  relatedTerms.forEach(relatedTerm => {
    const regex = new RegExp(`\\b${relatedTerm.term}\\b`, 'gi');
    processedDefinition = processedDefinition.replace(
      regex, 
      `<a href="/enciclopedia/${relatedTerm.slug}" class="text-brand-green hover:text-brand-hover-green underline transition-colors">${relatedTerm.term}</a>`
    );
  });
  
  return processedDefinition;
}

// Função para gerar JSON-LD de um termo (atualizada)
export function generateTermJsonLd(term: EncyclopediaTerm, relatedTerms: EncyclopediaTerm[] = []): object {
  const termJsonLd = {
    '@context': 'https://schema.org' as const,
    '@type': 'DefinedTerm' as const,
    name: term.term,
    description: term.definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet' as const,
      name: 'Enciclopédia Canábica - Floriplanta',
      description: 'Glossário completo de termos relacionados à cannabis medicinal, química e legislação',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/enciclopedia`
    } as DefinedTermSet,
    category: term.category,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/enciclopedia/${term.slug}`,
    publisher: {
      '@type': 'Organization' as const,
      name: 'Floriplanta',
      url: process.env.NEXT_PUBLIC_SITE_URL
    } as Organization,
    mainEntity: {
      '@type': 'FAQPage' as const,
      mainEntity: [{
        '@type': 'Question' as const,
        name: `O que é ${term.term}?`,
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: term.definition
        } as Answer
      } as Question]
    } as FAQPage,
    seeAlso: undefined as URL[] | undefined
  };

  if (relatedTerms.length > 0) {
    termJsonLd.seeAlso = relatedTerms.map(
      (related) => `${process.env.NEXT_PUBLIC_SITE_URL}/enciclopedia/${related.slug}` as URL
    );
  }
  
  if (!termJsonLd.seeAlso || termJsonLd.seeAlso.length === 0) {
    delete (termJsonLd as any).seeAlso; 
  }
  
  return termJsonLd;
}

// Função para gerar JSON-LD da página principal
export function generateEncyclopediaJsonLd(totalTerms: number, categories: { category: EncyclopediaCategory; count: number }[]): object {
  const encyclopediaJsonLd = {
    '@context': 'https://schema.org' as const,
    '@type': 'Dataset' as const,
    name: 'Enciclopédia Canábica',
    description: 'Enciclopédia completa sobre cannabis medicinal, contendo definições científicas, informações sobre saúde e aspectos legais da cannabis no Brasil',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/enciclopedia`,
    publisher: {
      '@type': 'Organization' as const,
      name: 'Floriplanta',
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png` 
    } as Organization,
    keywords: ['cannabis medicinal', 'CBD', 'THC', 'canabinoides', 'terpenos', 'legislação cannabis', 'cannabis Brasil'].join(', '),
    numberOfItems: totalTerms,
    about: categories.map(cat => ({
      '@type': 'Thing' as const,
      name: cat.category,
      description: `${cat.count} termos relacionados a ${cat.category.toLowerCase()}`
    } as Thing))
  };
  return encyclopediaJsonLd;
}