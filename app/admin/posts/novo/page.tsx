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
import { createSupabaseClient } from '@/app/lib/supabase/client';
import { createPostAction } from '../actions';
import { getCategoriesAction } from '../../categorias/actions';
import { getTagsAction } from '../../tags/actions';
import { AdminFormLayout, SidebarCard } from '@/components/admin/admin-form-layout';
import { FormField } from '@/components/admin/form-field';
import { ImageUploader } from '@/components/admin/image-uploader';
import { TagSelector } from '@/components/admin/tag-selector';
import { useFormValidation } from '@/hooks/use-form-validation';
import EditorJSComponent from '@/components/admin/EditorJSComponent';
import { cn } from '@/lib/utils';

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

export default function NewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseClient, setSupabaseClient] = useState<ReturnType<typeof createSupabaseClient> | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScheduled, setIsScheduled] = useState(false);

  const {
    data: formData,
    errors,
    updateField,
    updateFields,
    isSaving,
    isDirty,
    lastSaved
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
      meta_description: ''
    },
    validationRules: {
      title: { required: true, minLength: 3, maxLength: 200 },
      slug: { required: true, minLength: 3, maxLength: 200 },
      content: { required: true },
      excerpt: { maxLength: 500 }
    },
    onSave: async (data) => {
      await handleSave(data, false);
    },
    autoSaveDelay: 3000
  });

  useEffect(() => {
    async function initializeData() {
      try {
        const client = createSupabaseClient();
        setSupabaseClient(client);

        const [categoriesResult, tagsResult] = await Promise.all([
          getCategoriesAction(),
          getTagsAction()
        ]);

        if (categoriesResult.data) setCategories(categoriesResult.data);
        if (tagsResult.data) setTags(tagsResult.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    }

    initializeData();
  }, []);

  const handleTitleChange = (title: string) => {
    updateFields({
      title,
      slug: normalizeSlug(title)
    });
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    if (!supabaseClient) throw new Error('Supabase client not initialized');

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error: uploadError } = await supabaseClient.storage
      .from('blog-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabaseClient.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return publicUrl;
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
        cover_image_url: coverImageUrl
      });

      if (result.error) {
        throw new Error(result.error);
      }

      if (redirect) {
        router.push('/admin/posts');
      }
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      throw error;
    }
  };

  const handlePublish = async () => {
    const publishData = {
      ...formData,
      status: 'published' as const,
      published_at: isScheduled ? formData.published_at : new Date()
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
            onClick={handlePublish}
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
                        !formData.published_at && 'text-muted-foreground'
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
              error={errors.excerpt}
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
            error={errors.title}
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
            error={errors.slug}
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
          error={errors.content}
        >
          <div className="border rounded-lg">
            <EditorJSComponent
              value={formData.content}
              onChange={(data) => updateField('content', data)}
              supabaseClient={supabaseClient}
            />
          </div>
        </FormField>
      </div>
    </AdminFormLayout>
  );
}