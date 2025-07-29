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
import { Save, Eye, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { getPostForEdit, updatePostAction, getCategoriesForAdmin, getTagsForAdmin } from '../actions';
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

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const [postId, setPostId] = useState<string>('');
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
    save,
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
        const resolvedParams = await params;
        const id = resolvedParams.id;
        setPostId(id);



        const [postResult, categoriesResult, tagsResult] = await Promise.all([
          getPostForEdit(id),
          getCategoriesForAdmin(),
          getTagsForAdmin(),
        ]);

        if (postResult.error) {
          toast.error('Erro ao carregar post: ' + postResult.error);
          router.push('/admin/posts');
          return;
        }

        setCategories(categoriesResult);
        setTags(tagsResult);

        // Carregar dados do post
        const post = postResult.data!;
        const postData = {
          title: post.title,
          slug: post.slug,
          content: post.content ? JSON.parse(post.content) : null,
          excerpt: '', // Campo não existe no schema, usar valor padrão
          cover_image_url: post.imageUrl || '',
          status: post.published ? 'published' as const : 'draft' as const,
          published_at: post.createdAt ? new Date(post.createdAt) : null,
          category_ids: post.categories?.map(cat => cat.id.toString()) || [],
          tag_ids: post.tags?.map(tag => tag.id.toString()) || [],
          meta_description: '', // Campo não existe no schema, usar valor padrão
        };

        updateFields(postData);
        setIsScheduled(!!postData.published_at && postData.published_at > new Date());
      } catch {
        toast.error('Erro ao carregar dados do post');
      } finally {
        setIsLoading(false);
      }
    }

    void initializeData();
  }, [params, router, updateFields]);

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

      const result = await updatePostAction(postId, {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        body: JSON.stringify(data.content),
        cover_image_url: coverImageUrl,
        status: data.status,
        published_at: data.published_at ? data.published_at.toISOString() : null,
        category_ids: data.category_ids.map(id => parseInt(id, 10)),
        tag_ids: data.tag_ids.map(id => parseInt(id, 10)),
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success('Post atualizado com sucesso!');

      if (redirect) {
        router.push('/admin/posts');
      }
    } catch {
      toast.error('Erro ao salvar post');
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
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando post...</span>
        </div>
      </div>
    );
  }

  return (
    <AdminFormLayout
      title="Editar Post"
      description="Edite as informações do seu post"
      backUrl="/admin/posts"
      actions={
        <div className="flex items-center space-x-2">
          {lastSaved && (
            <span className="text-sm text-muted-foreground">
              Salvo {format(lastSaved, 'HH:mm', { locale: ptBR })}
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
          <Button onClick={() => void handlePublish()} disabled={isSaving}>
            {formData.status === 'published' ? 'Atualizar' : 'Publicar'}
          </Button>
        </div>
      }
      sidebar={
        <div className="space-y-6">
          {/* Status e Publicação */}
          <SidebarCard title="Publicação" icon={Eye}>
            <div className="space-y-4">
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
                          format(formData.published_at, "PPP 'às' HH:mm", { locale: ptBR })
                        ) : (
                          <span>Selecionar data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.published_at || undefined}
                        onSelect={(date) => updateField('published_at', date || null)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormField>
              )}
            </div>
          </SidebarCard>

          {/* Categorias */}
          <SidebarCard title="Organização">
            <div className="space-y-4">
              <TagSelector
                selectedValues={formData.category_ids}
                onChange={(ids) => updateField('category_ids', ids)}
                options={categories}
                placeholder="Selecionar categorias"
                maxTags={3}
              />

              <TagSelector
                selectedValues={formData.tag_ids}
                onChange={(ids) => updateField('tag_ids', ids)}
                options={tags}
                placeholder="Selecionar tags"
                allowCreate
                maxTags={10}
              />
            </div>
          </SidebarCard>

          {/* Mídia e Resumo */}
          <SidebarCard title="Mídia & Resumo">
            <div className="space-y-4">
              <FormField label="Imagem de capa">
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
                  maxSize={5}
                />
              </FormField>

              <FormField
                label="Resumo"
                description="Breve descrição do post (máx. 500 caracteres)"
                error={normalizeError(errors.excerpt)}
              >
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => updateField('excerpt', e.target.value)}
                  placeholder="Escreva um resumo do post..."
                  rows={3}
                  maxLength={500}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {formData.excerpt.length}/500 caracteres
                </div>
              </FormField>

              <FormField
                label="Meta Descrição"
                description="Descrição para SEO (máx. 160 caracteres)"
              >
                <Textarea
                  value={formData.meta_description}
                  onChange={(e) => updateField('meta_description', e.target.value)}
                  placeholder="Meta descrição para SEO..."
                  rows={2}
                  maxLength={160}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {formData.meta_description.length}/160 caracteres
                </div>
              </FormField>
            </div>
          </SidebarCard>
        </div>
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