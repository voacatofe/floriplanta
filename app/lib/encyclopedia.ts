/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@/lib/generated/prisma';
import type { 
  DefinedTermSet, 
  Organization, 
  FAQPage, 
  Question, 
  Answer, 
  Thing,
  URL, 
} from 'schema-dts'; 

export type EncyclopediaCategory = 'Saúde' | 'Química' | 'Legislação';

// Função helper para converter string para EncyclopediaCategory com validação
export function toEncyclopediaCategory(category: string): EncyclopediaCategory {
  const validCategories: EncyclopediaCategory[] = ['Saúde', 'Química', 'Legislação'];
  if (validCategories.includes(category as EncyclopediaCategory)) {
    return category as EncyclopediaCategory;
  }
  // Fallback para categoria padrão se a string não for válida
  return 'Saúde';
}

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

// Função helper para converter dados do Prisma para EncyclopediaTerm
function convertPrismaToEncyclopediaTerm(prismaData: any): EncyclopediaTerm {
  return {
    ...prismaData,
    category: toEncyclopediaCategory(prismaData.category),
    created_at: prismaData.created_at.toISOString(),
    updated_at: prismaData.updated_at.toISOString(),
  };
}

const prisma = new PrismaClient();

export async function getAllTerms(
  page = 1,
  pageSize = 20,
  category?: EncyclopediaCategory,
  searchQuery?: string,
): Promise<EncyclopediaSearchResult> {
  const where: any = { is_active: true };

  if (category) {
    where.category = category;
  }

  if (searchQuery) {
    where.OR = [
      { term: { contains: searchQuery, mode: 'insensitive' } },
      { definition: { contains: searchQuery, mode: 'insensitive' } },
    ];
  }

  const totalCount = await prisma.encyclopediaTerm.count({ where });

  const terms = await prisma.encyclopediaTerm.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { term: 'asc' },
  });

  // Buscar contagem por categoria
  const categoryCountsResult = await prisma.encyclopediaTerm.groupBy({
    by: ['category'],
    _count: {
      category: true,
    },
    where: { is_active: true },
  });
  
  const categories = categoryCountsResult.map((item: { category: string; _count: { category: number } }) => ({
    category: toEncyclopediaCategory(item.category),
    count: item._count.category,
  }));
  
  return {
    terms: terms.map(convertPrismaToEncyclopediaTerm),
    totalCount,
    categories,
  };
}

export async function getTermBySlug(slug: string): Promise<EncyclopediaTerm | null> {
  const normalizedSlug = normalizeSlug(slug);
  
  const term = await prisma.encyclopediaTerm.findUnique({
    where: { slug: normalizedSlug, is_active: true },
  });

  return term ? convertPrismaToEncyclopediaTerm(term) : null;
}

// Função para buscar termos relacionados
export async function getRelatedTerms(relatedSlugs: string[]): Promise<EncyclopediaTerm[]> {
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return [];
  }
  
  const terms = await prisma.encyclopediaTerm.findMany({
    where: {
      slug: { in: relatedSlugs },
      is_active: true,
    },
    orderBy: { term: 'asc' },
  });

  return terms.map(convertPrismaToEncyclopediaTerm);
}

export async function searchTerms(query: string): Promise<EncyclopediaTerm[]> {
  if (!query) return [];

  const terms = await prisma.encyclopediaTerm.findMany({
    where: {
      is_active: true,
      OR: [
        { term: { contains: query, mode: 'insensitive' } },
        { definition: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 10,
  });

  return terms.map(convertPrismaToEncyclopediaTerm);
}

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
      `<a href="/enciclopedia/${relatedTerm.slug}" class="text-brand-green hover:text-brand-hover-green underline transition-colors">${relatedTerm.term}</a>`,
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
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/enciclopedia`,
    } as DefinedTermSet,
    category: term.category,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/enciclopedia/${term.slug}`,
    publisher: {
      '@type': 'Organization' as const,
      name: 'Floriplanta',
      url: process.env.NEXT_PUBLIC_SITE_URL,
    } as Organization,
    mainEntity: {
      '@type': 'FAQPage' as const,
      mainEntity: [{
        '@type': 'Question' as const,
        name: `O que é ${term.term}?`,
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: term.definition,
        } as Answer,
      } as Question],
    } as FAQPage,
    seeAlso: undefined as URL[] | undefined,
  };

  if (relatedTerms.length > 0) {
    termJsonLd.seeAlso = relatedTerms.map(
      (related) => `${process.env.NEXT_PUBLIC_SITE_URL}/enciclopedia/${related.slug}` as URL,
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
      logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`, 
    } as Organization,
    keywords: ['cannabis medicinal', 'CBD', 'THC', 'canabinoides', 'terpenos', 'legislação cannabis', 'cannabis Brasil'].join(', '),
    numberOfItems: totalTerms,
    about: categories.map(cat => ({
      '@type': 'Thing' as const,
      name: cat.category,
      description: `${cat.count} termos relacionados a ${cat.category.toLowerCase()}`,
    } as Thing)),
  };
  return encyclopediaJsonLd;
}