'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { createTermAction, getAllTermsForAdmin } from '../actions';
import { type EncyclopediaCategory } from '@/app/lib/encyclopedia';

interface TermOption {
  id: string;
  term: string;
  slug: string;
}

function normalizeSlug(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-+/g, '-');
}

export default function NewTermPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableTerms, setAvailableTerms] = useState<TermOption[]>([]);
  
  const [formData, setFormData] = useState({
    term: '',
    slug: '',
    definition: '',
    category: 'Saúde' as EncyclopediaCategory,
    related_terms: [] as string[],
    meta_description: ''
  });
  
  const [newRelatedTerm, setNewRelatedTerm] = useState('');

  const categories: EncyclopediaCategory[] = ['Saúde', 'Química', 'Legislação'];

  useEffect(() => {
    async function loadAvailableTerms() {
      try {
        setIsLoading(true);
        const termsResult = await getAllTermsForAdmin();
        if (termsResult.error) {
          console.error('Erro ao carregar termos:', termsResult.error);
        } else if (termsResult.data) {
          setAvailableTerms(termsResult.data);
        }
      } catch (err) {
        console.error('Erro ao carregar termos disponíveis:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadAvailableTerms();
  }, []);

  const handleTermChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      term: value,
      slug: normalizeSlug(value)
    }));
  };

  const handleAddRelatedTerm = () => {
    if (newRelatedTerm.trim() && !formData.related_terms.includes(newRelatedTerm.trim())) {
      setFormData(prev => ({
        ...prev,
        related_terms: [...prev.related_terms, newRelatedTerm.trim()]
      }));
      setNewRelatedTerm('');
    }
  };

  const handleRemoveRelatedTerm = (termToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      related_terms: prev.related_terms.filter(term => term !== termToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.term.trim() || !formData.definition.trim()) {
      setError('Termo e definição são obrigatórios.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const result = await createTermAction(formData);
      
      if (result.error) {
        setError(result.error);
      } else {
        router.push('/admin/enciclopedia');
      }
    } catch (err) {
      console.error('Erro ao criar termo:', err);
      setError('Erro interno ao criar o termo.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/admin/enciclopedia">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Enciclopédia
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Novo Termo da Enciclopédia</CardTitle>
            <CardDescription>
              Adicione um novo termo à enciclopédia canábica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="term">Termo *</Label>
                  <Input
                    id="term"
                    value={formData.term}
                    onChange={(e) => handleTermChange(e.target.value)}
                    placeholder="Nome do termo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="slug-do-termo"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="definition">Definição *</Label>
                <Textarea
                  id="definition"
                  value={formData.definition}
                  onChange={(e) => setFormData(prev => ({ ...prev, definition: e.target.value }))}
                  placeholder="Definição completa do termo"
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: EncyclopediaCategory) => 
                    setFormData(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Descrição</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="Descrição para SEO (opcional)"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <Label>Termos Relacionados</Label>
                
                {formData.related_terms.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.related_terms.map((term, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {term}
                        <button
                          type="button"
                          onClick={() => handleRemoveRelatedTerm(term)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Input
                    value={newRelatedTerm}
                    onChange={(e) => setNewRelatedTerm(e.target.value)}
                    placeholder="Digite um termo relacionado"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddRelatedTerm();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddRelatedTerm}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {availableTerms.length > 0 && (
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">Termos disponíveis:</p>
                    <div className="flex flex-wrap gap-1">
                      {availableTerms
                        .filter(term => !formData.related_terms.includes(term.term))
                        .slice(0, 10)
                        .map((term) => (
                          <button
                            key={term.id}
                            type="button"
                            onClick={() => {
                              setNewRelatedTerm(term.term);
                            }}
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                          >
                            {term.term}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-6">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Criar Termo
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}