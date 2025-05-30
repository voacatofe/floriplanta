'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Loader2, CalendarIcon, UploadCloud } from 'lucide-react';
import { createPostAction, type PostCreationData } from '../actions';
import { getAllCategories, getAllTags, type Category, type Tag } from '@/app/lib/blog-data';
import { MultiSelectCheckbox, type MultiSelectOption } from '@/components/ui/multi-select-checkbox';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { cn } from "@/lib/utils"
import { createBrowserClient } from '@supabase/ssr';

// TODO: Definir o tipo completo para o formulário de post
type PostFormData = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url: string;
  author_id: string; // Assumindo que o autor logado será o autor do post
  status: 'draft' | 'published';
  category_ids: number[];
  tag_ids: number[];
  published_at: string | null;
};

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<PostCreationData>>({
    title: '',
    slug: '',
    excerpt: '',
    body: '',
    cover_image_url: '',
    status: 'draft',
    category_ids: [],
    tag_ids: [],
    published_at: null,
    // author_id será preenchido na Server Action
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPublishedDate, setSelectedPublishedDate] = useState<Date | undefined>(undefined);
  
  // Novos estados para upload de imagem
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Cliente Supabase para o browser
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchData() {
      const [cats, tgs] = await Promise.all([
        getAllCategories(),
        getAllTags(),
      ]);
      setCategories(cats);
      setTags(tgs);
    }
    fetchData();
  }, []);

  const categoryOptions: MultiSelectOption[] = categories.map((cat: Category) => ({ value: cat.id.toString(), label: cat.name }));
  const tagOptions: MultiSelectOption[] = tags.map((tag: Tag) => ({ value: tag.id.toString(), label: tag.name }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<PostCreationData>) => ({ ...prev, [name]: value }));
    if (name === 'title') {
      // Gerar slug automaticamente (simplificado)
      setFormData((prev: Partial<PostCreationData>) => ({ 
        ...prev, 
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') 
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file)); // Cria preview da imagem
      // Limpar URL antiga se houver um novo arquivo
      setFormData(prev => ({...prev, cover_image_url: ''})); 
    }
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev: Partial<PostCreationData>) => ({ ...prev, status: value as 'draft' | 'published' }));
  };

  const handleCategoriesChange = (selectedCategoryIds: string[]) => {
    setFormData((prev: Partial<PostCreationData>) => ({ ...prev, category_ids: selectedCategoryIds.map(id => parseInt(id)) }));
  };

  const handleTagsChange = (selectedTagIds: string[]) => {
    setFormData((prev: Partial<PostCreationData>) => ({ ...prev, tag_ids: selectedTagIds.map(id => parseInt(id)) }));
  };
  
  const handlePublishedDateChange = (date: Date | undefined) => {
    setSelectedPublishedDate(date);
    setFormData((prev: Partial<PostCreationData>) => ({ ...prev, published_at: date ? format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setUploading(false); // Reset uploading state
    setError(null);

    let coverImageUrl = formData.cover_image_url || null;

    if (selectedFile) {
      setUploading(true);
      const fileName = `${Date.now()}-${selectedFile.name.replace(/\s+/g, '-')}`.toLowerCase();
      const filePath = `public/${fileName}`; // Supabase Storage adiciona 'public/' por padrão se não especificar

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blogimages')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      setUploading(false);

      if (uploadError) {
        setError(`Erro no upload da imagem: ${uploadError.message}`);
        setIsLoading(false);
        return;
      }

      // Obter a URL pública da imagem
      const { data: publicUrlData } = supabase.storage
        .from('blogimages')
        .getPublicUrl(filePath);
      
      if (publicUrlData) {
        coverImageUrl = publicUrlData.publicUrl;
      } else {
        setError('Erro ao obter URL pública da imagem.');
        setIsLoading(false);
        return;
      }
    }

    const finalSubmissionData: PostCreationData = {
        title: formData.title || '',
        slug: formData.slug || '',
        excerpt: formData.excerpt?.trim() || null,
        body: formData.body?.trim() || null,
        cover_image_url: coverImageUrl, // Usar a URL do Supabase ou a URL manual
        status: formData.status || 'draft',
        category_ids: formData.category_ids || [],
        tag_ids: formData.tag_ids || [],
        published_at: formData.status === 'published' 
                        ? (selectedPublishedDate ? format(selectedPublishedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : new Date().toISOString()) 
                        : null,
    };

    // A action agora precisa do author_id, que deve ser pego do lado do servidor na action.
    // Se quiséssemos passar daqui, precisaríamos de uma forma de obter o user.id no cliente ou passar como prop.
    // Por ora, a action pegará o author_id.
    // Assumindo que createPostAction será adaptada para obter author_id.
    const result = await createPostAction(finalSubmissionData); 
    
    setIsLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      // Idealmente, mostrar um toast de sucesso aqui
      router.push('/admin/posts'); 
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>Criar Novo Post</CardTitle>
            <Button variant="outline" size="sm" asChild>
                <Link href="/admin/posts">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Posts
                </Link>
            </Button>
        </div>
        <CardDescription>Preencha os detalhes do novo post.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coluna Principal (Título, Slug, Corpo, Excerpt) */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" name="title" value={formData.title || ''} onChange={handleChange} required disabled={isLoading} />
              </div>
              <div>
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input id="slug" name="slug" value={formData.slug || ''} onChange={handleChange} required disabled={isLoading} />
                <p className="text-xs text-gray-500 mt-1">Será usado na URL. Ex: /blog/meu-novo-post</p>
              </div>
              <div>
                <Label htmlFor="excerpt">Resumo (Excerpt)</Label>
                <Textarea id="excerpt" name="excerpt" value={formData.excerpt || ''} onChange={handleChange} rows={3} disabled={isLoading} />
              </div>
              <div>
                <Label htmlFor="body">Conteúdo Principal (Markdown)</Label>
                <Textarea id="body" name="body" value={formData.body || ''} onChange={handleChange} rows={15} disabled={isLoading} />
                <p className="text-xs text-gray-500 mt-1">Use sintaxe Markdown para formatar o texto.</p>
              </div>
            </div>

            {/* Coluna Lateral (Status, Categorias, Tags, Imagem, Publicação) */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status || 'draft'}
                  onValueChange={handleStatusChange} 
                  disabled={isLoading}
                >
                  <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Categorias</Label>
                <MultiSelectCheckbox
                  options={categoryOptions}
                  selectedValues={formData.category_ids?.map((id: number) => id.toString()) || []}
                  onChange={handleCategoriesChange}
                  placeholder="Selecione categorias"
                />
              </div>
              <div>
                <Label>Tags</Label>
                <MultiSelectCheckbox
                  options={tagOptions}
                  selectedValues={formData.tag_ids?.map((id: number) => id.toString()) || []}
                  onChange={handleTagsChange}
                  placeholder="Selecione tags"
                />
              </div>
              <div>
                <Label htmlFor="cover_image_url">URL da Imagem de Capa (Alternativa)</Label>
                <Input 
                  id="cover_image_url" 
                  name="cover_image_url" 
                  value={formData.cover_image_url || ''} 
                  onChange={handleChange} 
                  placeholder="https://exemplo.com/imagem.jpg (se não for fazer upload)" 
                  disabled={isLoading || !!selectedFile} // Desabilitar se um arquivo foi selecionado
                />
              </div>
              <div>
                <Label htmlFor="cover_image_file">Upload da Imagem de Capa</Label>
                <Input 
                  id="cover_image_file" 
                  name="cover_image_file" 
                  type="file" 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  disabled={isLoading || uploading}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
                {uploading && <p className="text-xs text-gray-500 mt-1 flex items-center"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Enviando imagem...</p>}
                {filePreview && (
                  <div className="mt-2">
                    <img src={filePreview} alt="Pré-visualização da imagem" className="max-h-40 rounded-md border" />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Selecione uma imagem ou cole uma URL acima.</p>
              </div>
              {formData.status === 'published' && (
                <div>
                  <Label htmlFor="published_at">Data de Publicação</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedPublishedDate && "text-muted-foreground"
                        )}
                        disabled={isLoading}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedPublishedDate ? format(selectedPublishedDate, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedPublishedDate}
                        onSelect={handlePublishedDateChange}
                        initialFocus
                        disabled={isLoading}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-gray-500 mt-1">Deixe em branco para publicar imediatamente.</p>
                </div>
              )}
            </div>
          </div>
          
          {error && (
            <p className="mt-4 text-sm text-red-600 bg-red-100 border border-red-300 p-3 rounded-md">
              {error}
            </p>
          )}
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} 
            {isLoading ? 'Salvando...' : 'Salvar Post'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 