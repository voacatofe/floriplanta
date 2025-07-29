'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Save, Eye, Calendar as CalendarIcon, Loader2, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { createPostAction, getCategoriesForAdmin, getTagsForAdmin } from '../actions';
import { AdminFormLayout, SidebarCard } from '@/components/admin/admin-form-layout';
import { FormField } from '@/components/admin/form-field';
import { ImageUploader } from '@/components/admin/image-uploader';
import { TagSelector } from '@/components/admin/tag-selector';
import { useFormValidation } from '@/hooks/use-form-validation';
import EditorJSComponent from '@/components/admin/EditorJSComponent';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { OutputData } from '@editorjs/editorjs';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface PostFormData {
  title: string;
  slug: string;
  content: object | null;
  excerpt: string;
  cover_image_url: string;
  status: 'draft' | 'published';
  published_at: Date | null;
  category_ids: string[];
  tag_ids: string[];
  meta_description: string;
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

export default function NewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScheduled, setIsScheduled] = useState(false);

  const {
    data: formData,
    errors,
    updateField,
    updateFields,
    isSaving,
    isDirty,
    lastSaved,
  } = useFormValidation<PostFormData>({
    initialData: {
      title: '',
      slug: '',
      content: null,
      excerpt: '',
      cover_image_url: '',
      status: 'draft',
      published_at: null,
      category_ids: [],
      tag_ids: [],
      meta_description: '',
    },
    validationRules: {
      title: { required: true, minLength: 3, maxLength: 200 },
      slug: { required: true, minLength: 3, maxLength: 200 },
      content: { required: true },
      excerpt: { maxLength: 500 },
    },
    onSave: async (data) => {
      await handleSave(data, false);
    },
    autoSaveDelay: 3000,
  });

  useEffect(() => {
    async function initializeData() {
      try {
        const [categories, tags] = await Promise.all([
          getCategoriesForAdmin(),
          getTagsForAdmin(),
        ]);

        setCategories(categories);
        setTags(tags);
      } catch {
        toast.error('Erro ao carregar dados de categorias e tags');
      } finally {
        setIsLoading(false);
      }
    }

    void initializeData();
  }, []);

  const handleTitleChange = (title: string) => {
    updateFields({
      title,
      slug: normalizeSlug(title),
    });
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'posts');

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro no upload da imagem');
    }

    const { url } = await response.json();
    return url;
  };

  const handleSave = async (data: PostFormData, redirect = true) => {
    try {
      let coverImageUrl = data.cover_image_url;

      if (selectedFile) {
        coverImageUrl = await handleImageUpload(selectedFile);
        setSelectedFile(null);
      }

      const result = await createPostAction({
        ...data,
        body: data.content ? JSON.stringify(data.content) : null,
        cover_image_url: coverImageUrl,
        published_at: data.published_at ? data.published_at.toISOString() : null,
        category_ids: data.category_ids.map(id => parseInt(id, 10)),
        tag_ids: data.tag_ids.map(id => parseInt(id, 10)),
      });

      if (result.error) {
        throw new Error(result.error);
      }

      if (redirect) {
        router.push('/admin/posts');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido';
      toast.error(`Erro ao salvar post: ${errorMessage}`);
      throw error;
    }
  };

  const handlePublish = async () => {
    const publishData = {
      ...formData,
      status: 'published' as const,
      published_at: isScheduled ? formData.published_at : new Date(),
    };

    updateFields(publishData);
    await handleSave(publishData);
  };

  const handleScheduleToggle = (checked: boolean) => {
    setIsScheduled(checked);
    if (!checked) {
      updateField('published_at', null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <AdminFormLayout
      title="Novo Post"
      description="Crie um novo post para o blog"
      backUrl="/admin/posts"
      actions={
        <div className="flex items-center gap-2">
          {isDirty && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {lastSaved ? (
                <span>Salvo {format(lastSaved, 'HH:mm', { locale: ptBR })}</span>
              ) : (
                <span>Não salvo</span>
              )}
            </div>
          )}

          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>

          <Button
            onClick={() => void handlePublish()}
            disabled={isSaving || Object.keys(errors).length > 0}
            size="sm"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {formData.status === 'published' ? 'Atualizar' : 'Publicar'}
          </Button>
        </div>
      }
      sidebar={
        <>
          {/* Status e Publicação */}
          <SidebarCard title="Publicação">
            <FormField label="Status">
              <Select
                value={formData.status}
                onValueChange={(value: 'draft' | 'published') => updateField('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <div className="flex items-center space-x-2">
              <Switch
                id="schedule"
                checked={isScheduled}
                onCheckedChange={handleScheduleToggle}
              />
              <label htmlFor="schedule" className="text-sm font-medium">
                Agendar publicação
              </label>
            </div>

            {isScheduled && (
              <FormField label="Data de publicação">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !formData.published_at && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.published_at ? (
                        format(formData.published_at, 'PPP', { locale: ptBR })
                      ) : (
                        'Selecionar data'
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.published_at || undefined}
                      onSelect={(date) => updateField('published_at', date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormField>
            )}
          </SidebarCard>

          {/* Organização */}
          <SidebarCard title="Organização">
            <FormField label="Categorias">
              <TagSelector
                selectedValues={formData.category_ids}
                onChange={(values) => updateField('category_ids', values)}
                options={categories}
                placeholder="Selecionar categorias..."
                maxTags={3}
              />
            </FormField>

            <FormField label="Tags">
              <TagSelector
                selectedValues={formData.tag_ids}
                onChange={(values) => updateField('tag_ids', values)}
                options={tags}
                placeholder="Selecionar tags..."
                allowCreate
              />
            </FormField>
          </SidebarCard>

          {/* Mídia */}
          <SidebarCard title="Imagem de Capa">
            <ImageUploader
              value={formData.cover_image_url}
              onChange={(file, url) => {
                if (file) {
                  setSelectedFile(file);
                } else {
                  updateField('cover_image_url', url || '');
                }
              }}
              onUpload={handleImageUpload}
            />
          </SidebarCard>

          {/* SEO */}
          <SidebarCard title="SEO">
            <FormField
              label="Resumo"
              description="Breve descrição do post"
              error={normalizeError(errors.excerpt)}
            >
              <Textarea
                value={formData.excerpt}
                onChange={(e) => updateField('excerpt', e.target.value)}
                placeholder="Resumo do post..."
                rows={3}
              />
            </FormField>

            <FormField
              label="Meta Descrição"
              description="Descrição para mecanismos de busca"
            >
              <Textarea
                value={formData.meta_description}
                onChange={(e) => updateField('meta_description', e.target.value)}
                placeholder="Meta descrição..."
                rows={2}
              />
            </FormField>
          </SidebarCard>
        </>
      }
    >
      <div className="space-y-6">
        {/* Título e Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Título"
            required
            error={normalizeError(errors.title)}
          >
            <Input
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Título do post"
            />
          </FormField>

          <FormField
            label="Slug"
            required
            error={normalizeError(errors.slug)}
            description="URL amigável do post"
          >
            <Input
              value={formData.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              placeholder="slug-do-post"
            />
          </FormField>
        </div>

        {/* Editor de Conteúdo */}
        <FormField
          label="Conteúdo"
          required
          error={normalizeError(errors.content)}
        >
          <div className="border rounded-lg">
            <EditorJSComponent
              value={formData.content as OutputData}
              onChange={(data) => updateField('content', data)}

            />
          </div>
        </FormField>
      </div>
    </AdminFormLayout>
  );
}