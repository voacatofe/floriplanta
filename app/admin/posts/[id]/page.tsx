'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, CalendarIcon, Save, Eye, Settings2 } from 'lucide-react';
import { getPostForEdit, updatePostAction, getCategoriesForAdmin, getTagsForAdmin, type PostUpdateData } from '../actions';
import { type Category, type Tag } from '@/app/lib/blog-data';
import { MultiSelectCheckbox, type MultiSelectOption } from '@/components/ui/multi-select-checkbox';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { cn } from "@/lib/utils"
import { createBrowserClient } from '@supabase/ssr';
import { toast } from "sonner";
import { OutputData } from '@editorjs/editorjs';
import { Textarea } from '@/components/ui/textarea';
import type { SupabaseClient } from '@supabase/supabase-js';

const EditorJSComponent = dynamic(() => import('@/components/admin/EditorJSComponent'), {
  ssr: false,
  loading: () => <div className="border rounded-md min-h-[400px] flex items-center justify-center bg-gray-100 text-gray-400"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando Editor...</div>,
});

function normalizeSlug(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-+/g, '-');
}

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const [postId, setPostId] = useState<string>('');
  const [formData, setFormData] = useState<Partial<Omit<PostUpdateData, 'body'>>>({ title: '', slug: '', excerpt: '', cover_image_url: '', status: 'draft', category_ids: [], tag_ids: [], published_at: null });
  const [editorData, setEditorData] = useState<OutputData | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPublishedDate, setSelectedPublishedDate] = useState<Date | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  // Inicializar o cliente Supabase no lado do cliente
  useEffect(() => {
    const supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    setSupabase(supabaseClient);
  }, []);

  // Resolver params e carregar dados do post
  useEffect(() => {
    async function loadPost() {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        setPostId(id);

        // Carregar dados do post
        const postResult = await getPostForEdit(id);
        if (postResult.error) {
          setError(postResult.error);
          return;
        }

        const post = postResult.data!;
        
        // Preencher formulário com dados do post
        setFormData({
          title: post.title,
          slug: post.slug,
          excerpt: post.content ? post.content.substring(0, 160) : '',
          cover_image_url: post.imageUrl || '',
          status: post.published ? 'published' : 'draft',
          category_ids: post.categories?.map(cat => parseInt(cat.id)) || [],
          tag_ids: post.tags?.map(tag => parseInt(tag.id)) || [],
          published_at: post.createdAt ? new Date(post.createdAt).toISOString() : null
        });

        // Configurar preview da imagem
        if (post.imageUrl) {
          setFilePreview(post.imageUrl);
        }

        // Configurar editor com conteúdo existente
        if (post.content) {
          try {
            const parsedContent = JSON.parse(post.content);
            setEditorData(parsedContent);
          } catch {
            // Se não for JSON válido, criar estrutura básica
            setEditorData({
              time: Date.now(),
              blocks: [{
                type: 'paragraph',
                data: { text: post.content }
              }],
              version: '2.28.2'
            });
          }
        }

      } catch (error) {
        console.error('Erro ao carregar post:', error);
        setError('Erro ao carregar dados do post.');
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [params]);

  // Carregar categorias e tags
  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesData, tagsData] = await Promise.all([
          getCategoriesForAdmin(),
          getTagsForAdmin()
        ]);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Erro ao carregar categorias e tags:', error);
      }
    }
    loadData();
  }, []);

  const handleInputChange = useCallback((field: keyof typeof formData, value: string | number[] | string[] | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'title' && typeof value === 'string') {
      const newSlug = normalizeSlug(value);
      setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  }, []);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    if (!supabase) {
      toast.error('Cliente Supabase não inicializado');
      return null;
    }

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `blog-covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        toast.error('Erro ao fazer upload da imagem');
        return null;
      }

      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error('Erro ao fazer upload da imagem');
      return null;
    } finally {
      setUploading(false);
    }
  }, [supabase]);

  const handleSubmit = useCallback(async (status: 'draft' | 'published') => {
    if (!formData.title?.trim()) {
      toast.error('Título é obrigatório');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      let coverImageUrl = formData.cover_image_url;
      
      if (selectedFile) {
        const uploadedUrl = await uploadFile(selectedFile);
        if (uploadedUrl) {
          coverImageUrl = uploadedUrl;
        }
      }

      const editorContent = editorData ? JSON.stringify(editorData) : null;

      const postData: PostUpdateData = {
        title: formData.title!,
        slug: formData.slug!,
        excerpt: formData.excerpt || null,
        body: editorContent,
        cover_image_url: coverImageUrl || null,
        status,
        category_ids: formData.category_ids || [],
        tag_ids: formData.tag_ids || [],
        published_at: selectedPublishedDate?.toISOString() || null
      };

      const result = await updatePostAction(postId, postData);
      
      if (result.error) {
        setError(result.error);
        toast.error(result.error);
      } else {
        toast.success(`Post ${status === 'published' ? 'publicado' : 'salvo como rascunho'} com sucesso!`);
        router.push('/admin/posts');
      }
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      setError('Erro interno do servidor');
      toast.error('Erro ao atualizar post');
    } finally {
      setIsSaving(false);
    }
  }, [formData, editorData, selectedPublishedDate, selectedFile, uploadFile, postId, router]);

  const categoryOptions: MultiSelectOption[] = categories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));

  const tagOptions: MultiSelectOption[] = tags.map(tag => ({
    value: tag.id,
    label: tag.name
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando post...</span>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Erro ao carregar post</h2>
          <p className="text-red-600">{error}</p>
          <Link href="/admin/posts" className="inline-block mt-4">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Posts
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/posts">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Editar Post</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Conteúdo Principal */}
        <div className={cn("space-y-6", isSidebarOpen ? "lg:col-span-3" : "lg:col-span-4")}>
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Digite o título do post..."
              className="text-lg"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug || ''}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              placeholder="slug-do-post"
            />
          </div>

          {/* Resumo */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Resumo</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt || ''}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              placeholder="Breve descrição do post..."
              rows={3}
            />
          </div>

          {/* Editor */}
          <div className="space-y-2">
            <Label>Conteúdo</Label>
            {supabase && (
              <EditorJSComponent
                value={editorData}
                onChange={setEditorData}
                supabaseClient={supabase}
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="lg:col-span-1 space-y-6">
            {/* Ações */}
            <div className="bg-white border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Ações</h3>
              
              <div className="space-y-2">
                <Button
                  onClick={() => handleSubmit('draft')}
                  disabled={isSaving}
                  variant="outline"
                  className="w-full"
                >
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Salvar Rascunho
                </Button>
                
                <Button
                  onClick={() => handleSubmit('published')}
                  disabled={isSaving}
                  className="w-full"
                >
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Eye className="mr-2 h-4 w-4" />
                  )}
                  Publicar
                </Button>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Status</h3>
              <Select
                value={formData.status}
                onValueChange={(value: 'draft' | 'published') => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Imagem de Capa */}
            <div className="bg-white border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Imagem de Capa</h3>
              
              {filePreview && (
                <div className="relative">
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setFilePreview(null);
                      setSelectedFile(null);
                      handleInputChange('cover_image_url', '');
                    }}
                  >
                    ×
                  </Button>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="cover-image">Selecionar Imagem</Label>
                <Input
                  id="cover-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={uploading}
                />
                {uploading && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fazendo upload...
                  </div>
                )}
              </div>
            </div>

            {/* Categorias */}
            <div className="bg-white border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Categorias</h3>
              <MultiSelectCheckbox
                options={categoryOptions}
                value={formData.category_ids?.map(String) || []}
                onChange={(values) => handleInputChange('category_ids', values.map(Number))}
                placeholder="Selecionar categorias..."
              />
            </div>

            {/* Tags */}
            <div className="bg-white border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Tags</h3>
              <MultiSelectCheckbox
                options={tagOptions}
                value={formData.tag_ids?.map(String) || []}
                onChange={(values) => handleInputChange('tag_ids', values.map(Number))}
                placeholder="Selecionar tags..."
              />
            </div>

            {/* Data de Publicação */}
            <div className="bg-white border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Data de Publicação</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedPublishedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedPublishedDate ? (
                      format(selectedPublishedDate, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecionar data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedPublishedDate}
                    onSelect={setSelectedPublishedDate}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}