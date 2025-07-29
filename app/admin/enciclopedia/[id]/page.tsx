'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Save, Eye, Loader2, Plus, X, BookOpen, Tag, Calendar, BarChart3 } from 'lucide-react';
import { getTermForEdit, updateTermAction, getAllTermsForAdmin } from '../actions';
import { type EncyclopediaCategory } from '@/app/lib/encyclopedia';
import { AdminFormLayout, SidebarCard } from '@/components/admin/admin-form-layout';
import { FormField } from '@/components/admin/form-field';
import { useFormValidation } from '@/hooks/use-form-validation';
import { toast } from 'sonner';

interface TermData {
  id: string;
  term: string;
  slug: string;
  definition: string;
  category: EncyclopediaCategory;
  related_terms: string[];
  meta_description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface TermOption {
  id: string;
  term: string;
  slug: string;
}

interface TermFormData {
  term: string;
  slug: string;
  definition: string;
  category: EncyclopediaCategory;
  related_terms: string[];
  meta_description: string;
  is_active: boolean;
}

function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

// Helper function para converter null para undefined em erros
function normalizeError(error: string | null | undefined): string | undefined {
  return error ?? undefined;
}

export default function EditTermPage({ params }: { params: Promise<{ id: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [availableTerms, setAvailableTerms] = useState<TermOption[]>([]);
  const [newRelatedTerm, setNewRelatedTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState<TermOption[]>([]);
  const [termData, setTermData] = useState<TermData | null>(null);

  const categories: EncyclopediaCategory[] = ['Saúde', 'Química', 'Legislação'];

  const {
    data: formData,
    errors,
    updateField,
    updateFields,
    save,
    isSaving,
    isDirty,
    lastSaved,
  } = useFormValidation<TermFormData>({
    initialData: {
      term: '',
      slug: '',
      definition: '',
      category: 'Saúde',
      related_terms: [],
      meta_description: '',
      is_active: true,
    },
    validationRules: {
      term: { required: true, minLength: 2, maxLength: 100 },
      slug: { required: true, minLength: 2, maxLength: 100 },
      definition: { required: true, minLength: 10, maxLength: 2000 },
      meta_description: { maxLength: 160 },
    },
    onSave: async (data) => {
      await handleSave(data, false);
    },
    autoSaveDelay: 3000,
  });

  // Resolver params assíncronos
  useEffect(() => {
    void params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    async function loadData() {
      if (!resolvedParams) return; // Adicionar verificação extra

      try {
        // Carregar dados do termo
        const termResult = await getTermForEdit(resolvedParams.id);
        if (termResult.error) {
          toast.error(termResult.error);
          return;
        }

        if (termResult.data) {
          const data = termResult.data;
          setTermData(data);

          // Atualizar dados do formulário
          updateFields({
            term: data.term,
            slug: data.slug,
            definition: data.definition,
            category: data.category as EncyclopediaCategory,
            related_terms: data.related_terms || [],
            meta_description: data.meta_description || '',
            is_active: data.is_active,
          });
        }

        // Carregar termos disponíveis para relacionados
        const termsResult = await getAllTermsForAdmin();
        if (termsResult.error) {
          toast.error('Erro ao carregar termos disponíveis');
        } else if (termsResult.data) {
          // Filtrar o termo atual da lista
          const filtered = termsResult.data.filter(term => term.id !== resolvedParams.id);
          setAvailableTerms(filtered);
          setFilteredTerms(filtered);
        }
      } catch {
        toast.error('Erro ao carregar dados do termo');
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();
  }, [resolvedParams, updateFields]);

  useEffect(() => {
    if (newRelatedTerm.trim()) {
      const filtered = availableTerms.filter(term =>
        term.term.toLowerCase().includes(newRelatedTerm.toLowerCase()) &&
        !formData.related_terms.includes(term.term),
      );
      setFilteredTerms(filtered);
    } else {
      setFilteredTerms([]);
    }
  }, [newRelatedTerm, availableTerms, formData.related_terms]);

  const handleTermChange = (value: string) => {
    updateFields({
      term: value,
      slug: normalizeSlug(value),
    });
  };

  const handleAddRelatedTerm = (termToAdd?: string) => {
    const term = termToAdd || newRelatedTerm.trim();
    if (term && !formData.related_terms.includes(term)) {
      updateField('related_terms', [...formData.related_terms, term]);
      setNewRelatedTerm('');
    }
  };

  const handleRemoveRelatedTerm = (termToRemove: string) => {
    updateField('related_terms', formData.related_terms.filter(term => term !== termToRemove));
  };

  const handleSave = async (data: TermFormData, redirect = true) => {
    if (!resolvedParams) return;

    try {
      const result = await updateTermAction(resolvedParams.id, {
        term: data.term,
        slug: data.slug,
        definition: data.definition,
        category: data.category,
        related_terms: data.related_terms,
        meta_description: data.meta_description,
        is_active: data.is_active,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success('Termo atualizado com sucesso!');

      if (redirect) {
        router.push('/admin/enciclopedia');
      }
    } catch (error) {
      toast.error('Erro ao salvar termo');
      throw error;
    }
  };

  const handlePublish = async () => {
    await handleSave({ ...formData, is_active: true });
  };

  const handleUnpublish = async () => {
    await handleSave({ ...formData, is_active: false }, false);
    toast.success('Termo despublicado com sucesso!');
  };

  if (isLoading || !resolvedParams) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando dados...</span>
        </div>
      </div>
    );
  }

  return (
    <AdminFormLayout
      title={`Editar: ${formData.term || 'Termo'}`}
      description="Edite as informações do termo da enciclopédia"
      backUrl="/admin/enciclopedia"
      actions={
        <div className="flex items-center space-x-2">
          {lastSaved && (
            <span className="text-sm text-muted-foreground">
              Salvo às {lastSaved.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <Button
            variant="outline"
            onClick={() => void save()}
            disabled={isSaving || !isDirty}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isSaving ? 'Salvando...' : 'Salvar Rascunho'}
          </Button>
          {formData.is_active ? (
            <Button
              variant="outline"
              onClick={() => void handleUnpublish()}
              disabled={isSaving}
            >
              <Eye className="h-4 w-4 mr-2" />
              Despublicar
            </Button>
          ) : (
            <Button onClick={() => void handlePublish()} disabled={isSaving}>
              <BookOpen className="h-4 w-4 mr-2" />
              Publicar Termo
            </Button>
          )}
        </div>
      }
      sidebar={
        <div className="space-y-6">
          {/* Status */}
          <SidebarCard title="Status" icon={Eye}>
            <div className="space-y-4">
              <FormField label="Status de Publicação">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => updateField('is_active', checked)}
                  />
                  <span className="text-sm">
                    {formData.is_active ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
              </FormField>

              <FormField label="Categoria">
                <Select
                  value={formData.category}
                  onValueChange={(value: EncyclopediaCategory) => updateField('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium mb-1">Preview da URL</div>
                <div className="text-xs text-muted-foreground break-all">
                  /enciclopedia/{formData.slug || 'termo-exemplo'}
                </div>
              </div>
            </div>
          </SidebarCard>

          {/* Termos Relacionados */}
          <SidebarCard title="Termos Relacionados" icon={Tag}>
            <div className="space-y-4">
              {/* Termos já adicionados */}
              {formData.related_terms.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Termos adicionados:</div>
                  <div className="flex flex-wrap gap-2">
                    {formData.related_terms.map((term, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {term}
                        <button
                          onClick={() => handleRemoveRelatedTerm(term)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Adicionar novo termo */}
              <div className="space-y-2">
                <FormField label="Adicionar termo relacionado">
                  <div className="flex gap-2">
                    <Input
                      value={newRelatedTerm}
                      onChange={(e) => setNewRelatedTerm(e.target.value)}
                      placeholder="Digite o nome do termo..."
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
                      onClick={() => handleAddRelatedTerm()}
                      disabled={!newRelatedTerm.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </FormField>

                {/* Sugestões de termos */}
                {filteredTerms.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Sugestões:</div>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {filteredTerms.slice(0, 5).map((term) => (
                        <button
                          key={term.id}
                          onClick={() => handleAddRelatedTerm(term.term)}
                          className="w-full text-left px-2 py-1 text-sm rounded hover:bg-muted transition-colors"
                        >
                          {term.term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SidebarCard>

          {/* Informações do Termo */}
          {termData && (
            <SidebarCard title="Informações" icon={Calendar}>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Criado em:</span>
                  <span className="font-medium">
                    {new Date(termData.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Atualizado em:</span>
                  <span className="font-medium">
                    {new Date(termData.updated_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-mono text-xs">{termData.id}</span>
                </div>
              </div>
            </SidebarCard>
          )}

          {/* Estatísticas */}
          <SidebarCard title="Estatísticas" icon={BarChart3}>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Caracteres na definição:</span>
                <span className="font-medium">{formData.definition.length}/2000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Termos relacionados:</span>
                <span className="font-medium">{formData.related_terms.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Meta descrição:</span>
                <span className="font-medium">{formData.meta_description.length}/160</span>
              </div>
            </div>
          </SidebarCard>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Termo e Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Termo"
            required
            error={normalizeError(errors.term)}
          >
            <Input
              value={formData.term}
              onChange={(e) => handleTermChange(e.target.value)}
              placeholder="Nome do termo"
            />
          </FormField>

          <FormField
            label="Slug"
            required
            error={normalizeError(errors.slug)}
            description="URL amigável do termo"
          >
            <Input
              value={formData.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              placeholder="slug-do-termo"
            />
          </FormField>
        </div>

        {/* Definição */}
        <FormField
          label="Definição"
          required
          error={normalizeError(errors.definition)}
          description="Explicação detalhada do termo"
        >
          <Textarea
            value={formData.definition}
            onChange={(e) => updateField('definition', e.target.value)}
            placeholder="Escreva a definição do termo..."
            rows={8}
            maxLength={2000}
          />
          <div className="text-xs text-muted-foreground mt-1">
            {formData.definition.length}/2000 caracteres
          </div>
        </FormField>

        {/* Meta Descrição */}
        <FormField
          label="Meta Descrição"
          error={normalizeError(errors.meta_description)}
          description="Descrição para SEO (máx. 160 caracteres)"
        >
          <Textarea
            value={formData.meta_description}
            onChange={(e) => updateField('meta_description', e.target.value)}
            placeholder="Meta descrição para SEO..."
            rows={3}
            maxLength={160}
          />
          <div className="text-xs text-muted-foreground mt-1">
            {formData.meta_description.length}/160 caracteres
          </div>
        </FormField>
      </div>
    </AdminFormLayout>
  );
}