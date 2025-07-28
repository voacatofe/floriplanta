import { Suspense } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, BookOpen } from 'lucide-react';
import DeleteTermButton from './DeleteTermButton';
import { getAllTerms, type EncyclopediaCategory } from '@/app/lib/encyclopedia';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AdminEncyclopediaPageProps {
  searchParams: Promise<{
    page?: string;
    categoria?: EncyclopediaCategory;
    busca?: string;
  }>;
}

const categoryColors = {
  'Saúde': 'bg-green-100 text-green-800',
  'Química': 'bg-blue-100 text-blue-800',
  'Legislação': 'bg-purple-100 text-purple-800'
};

const categoryIcons = {
  'Saúde': '🏥',
  'Química': '⚗️',
  'Legislação': '⚖️'
};

async function TermsTable({ searchParams }: AdminEncyclopediaPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || '1');
  const category = resolvedSearchParams.categoria;
  const searchQuery = resolvedSearchParams.busca;

  const { terms, totalCount, categories } = await getAllTerms(
    currentPage,
    50, // Mais termos por página no admin
    category,
    searchQuery
  );

  return (
    <div className="space-y-4">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gray-900">
            {categories.reduce((total, cat) => total + cat.count, 0)}
          </div>
          <div className="text-sm text-gray-500">Total de Termos</div>
        </div>
        
        {categories.map(({ category, count }) => (
          <div key={category} className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-gray-900">{count}</div>
            <div className="text-sm text-gray-500 flex items-center">
              {categoryIcons[category]} {category}
            </div>
          </div>
        ))}
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white p-4 rounded-lg border">
        <form className="flex gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                name="busca"
                defaultValue={searchQuery}
                placeholder="Buscar termos..."
                className="pl-10"
              />
            </div>
          </div>
          
          <select 
            name="categoria"
            defaultValue={category || ''}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Todas as categorias</option>
            <option value="Saúde">🏥 Saúde</option>
            <option value="Química">⚗️ Química</option>
            <option value="Legislação">⚖️ Legislação</option>
          </select>
          
          <Button type="submit">Filtrar</Button>
        </form>
      </div>

      {/* Tabela de Termos */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Termo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Atualizado</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {terms.map((term) => (
              <TableRow key={term.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{term.term}</div>
                    <div className="text-sm text-gray-500 truncate max-w-md">
                      {term.meta_description || term.definition.substring(0, 100)}...
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={categoryColors[term.category]}>
                    {categoryIcons[term.category]} {term.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {new Date(term.updated_at).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <Badge variant={term.is_active ? 'default' : 'secondary'}>
                    {term.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link href={`/enciclopedia/${term.slug}`} target="_blank">
                        <BookOpen className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link href={`/admin/enciclopedia/${term.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteTermButton
                      termId={term.id}
                      termName={term.term}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {terms.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum termo encontrado
          </div>
        )}
      </div>

      {/* Paginação */}
      {totalCount > 50 && (
        <div className="flex justify-center">
          <div className="text-sm text-gray-500">
            Mostrando {terms.length} de {totalCount} termos
          </div>
        </div>
      )}
    </div>
  );
}

export default async function AdminEncyclopediaPage({ searchParams }: AdminEncyclopediaPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enciclopédia Canábica</h1>
          <p className="text-gray-600">Gerencie os termos da enciclopédia</p>
        </div>
        
        <div className="flex space-x-3">
          <Button asChild variant="outline">
            <Link href="/enciclopedia" target="_blank">
              <BookOpen className="h-4 w-4 mr-2" />
              Ver Enciclopédia
            </Link>
          </Button>
          
          <Button asChild>
            <Link href="/admin/enciclopedia/novo">
              <Plus className="h-4 w-4 mr-2" />
              Novo Termo
            </Link>
          </Button>
        </div>
      </div>

      {/* Conteúdo */}
      <Suspense fallback={<div>Carregando...</div>}>
        <TermsTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}