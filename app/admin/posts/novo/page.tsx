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
import { createPostAction, getCategoriesForAdmin, getTagsForAdmin, type PostCreationData } from '../actions';
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

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Omit<PostCreationData, 'body'>>>({ title: '', slug: '', excerpt: '', cover_image_url: '', status: 'draft', category_ids: [], tag_ids: [], published_at: null });
  const [editorData, setEditorData] = useState<OutputData | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPublishedDate, setSelectedPublishedDate] = useState<Date | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  // Inicializar o cliente Supabase no lado do cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const supabaseClient = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      setSupabase(supabaseClient);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const [cats, tgs] = await Promise.all([getCategoriesForAdmin(), getTagsForAdmin()]);
      setCategories(cats);
      setTags(tgs);
    }
    fetchData();
  }, []);

  const categoryOptions: MultiSelectOption[] = categories.map((cat) => ({ value: cat.id.toString(), label: cat.name }));
  const tagOptions: MultiSelectOption[] = tags.map((tag) => ({ value: tag.id.toString(), label: tag.name }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'title') setFormData((prev) => ({ ...prev, slug: normalizeSlug(value) }));
  };

  const handleEditorChange = useCallback((data: OutputData) => setEditorData(data), []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) { const file = e.target.files[0]; setSelectedFile(file); setFilePreview(URL.createObjectURL(file)); setFormData(prev => ({...prev, cover_image_url: ''})); } };
  const handleStatusChange = (value: string) => setFormData((prev) => ({ ...prev, status: value as 'draft' | 'published' }));
  const handleCategoriesChange = (selectedCategoryIds: string[]) => setFormData((prev) => ({ ...prev, category_ids: selectedCategoryIds.map(id => parseInt(id)) }));
  const handleTagsChange = (selectedTagIds: string[]) => setFormData((prev) => ({ ...prev, tag_ids: selectedTagIds.map(id => parseInt(id)) }));
  const handlePublishedDateChange = (date: Date | undefined) => { setSelectedPublishedDate(date); setFormData((prev) => ({ ...prev, published_at: date ? format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null })); };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if(e) e.preventDefault();
    
    // Verificar se o Supabase está inicializado
    if (!supabase) {
      toast.error("Cliente Supabase não inicializado. Tente recarregar a página.");
      return;
    }
    
    setIsLoading(true); setUploading(false); setError(null);
    let coverImageUrl = formData.cover_image_url || null;
    if (selectedFile) {
      setUploading(true);
      const fileName = `${Date.now()}-${selectedFile.name.replace(/\s+/g, '-')}`.toLowerCase();
      const filePath = `public/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('blogimages').upload(filePath, selectedFile, { cacheControl: '3600', upsert: false });
      setUploading(false);
      if (uploadError) { toast.error("Erro no upload da imagem de capa", { description: uploadError.message }); setIsLoading(false); return; }
      const { data: publicUrlData } = supabase.storage.from('blogimages').getPublicUrl(filePath);
      if (publicUrlData?.publicUrl) coverImageUrl = publicUrlData.publicUrl; else { toast.error("Erro ao obter URL da imagem de capa."); setIsLoading(false); return; }
    }
    const bodyContent = editorData ? JSON.stringify(editorData) : null;
    const finalSubmissionData: PostCreationData = { title: formData.title || '', slug: formData.slug || '', excerpt: formData.excerpt?.trim() || null, body: bodyContent, cover_image_url: coverImageUrl, status: formData.status || 'draft', category_ids: formData.category_ids || [], tag_ids: formData.tag_ids || [], published_at: formData.status === 'published' ? (selectedPublishedDate ? format(selectedPublishedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : new Date().toISOString()) : null };
    const result = await createPostAction(finalSubmissionData);
    setIsLoading(false);
    if (result?.error) { toast.error("Erro ao criar post", { description: result.error }); setError(result.error); } 
    else { toast.success("Post criado com sucesso!"); router.push('/admin/posts'); }
  };

  const handlePreview = () => toast.info("Funcionalidade de Preview ainda não implementada.");

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      {/* Barra de Ações Superior */}
      <header className="bg-white dark:bg-gray-800 p-3 flex items-center justify-between sticky top-0 z-20 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Link href="/admin/posts"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <h1 className="text-lg font-medium text-gray-700 dark:text-gray-200">Criar Novo Post</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePreview} disabled={isLoading}>
            <Eye className="mr-1.5 h-4 w-4" /> Preview
          </Button>
          <Button onClick={() => handleSubmit()} disabled={isLoading || uploading} size="sm">
            {isLoading ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Save className="mr-1.5 h-4 w-4" />}
            {isLoading ? 'Salvando...' : (formData.status === 'published' ? 'Publicar' : 'Salvar Rascunho')}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal do Formulário */}
      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        {/* Coluna Esquerda (Conteúdo Principal) */}
        <main className="flex-grow flex flex-col overflow-y-auto">
          {/* Seção Título e Slug - com padding e fundo da main (cinza claro) */}
          <div className="p-6 lg:p-8">
            <div className="max-w-3xl mx-auto">
              <Input 
                id="title" 
                name="title" 
                value={formData.title || ''} 
                onChange={handleChange} 
                required 
                disabled={isLoading} 
                className="text-3xl lg:text-4xl font-bold p-0 h-auto border-none focus-visible:ring-0 shadow-none bg-transparent placeholder-gray-400 dark:placeholder-gray-500 dark:text-white"
                placeholder="Título do Post"
              />
            </div>
            
            <div className="max-w-3xl mx-auto mt-2">
              <Input 
                id="slug" 
                name="slug" 
                value={formData.slug || ''} 
                onChange={handleChange} 
                required 
                disabled={isLoading} 
                className="text-sm p-0 h-auto border-none focus-visible:ring-0 shadow-none bg-transparent text-gray-500 dark:text-gray-400"
                placeholder="slug-do-post"
              />
            </div>
          </div>

          {/* Seção do Editor - Ocupa o restante do espaço. A div de max-width agora terá o fundo branco */}
          <div className="flex-grow flex flex-col max-w-3xl mx-auto w-full pb-6 lg:pb-8">
            <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm p-6 lg:p-8 flex-grow">
              {supabase ? (
                <EditorJSComponent value={editorData} onChange={handleEditorChange} supabaseClient={supabase} />
              ) : (
                <div className="border rounded-md min-h-[400px] flex items-center justify-center bg-gray-100 text-gray-400">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando Cliente Supabase...
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Coluna Direita (Barra Lateral de Configurações) */}
        <aside className={cn(
          "w-full lg:w-80 xl:w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6 space-y-6 overflow-y-auto transition-transform duration-300 ease-in-out fixed top-0 right-0 h-full lg:sticky lg:top-0 z-10 lg:z-0",
          isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}>
          <div className="flex items-center justify-between lg:hidden">
            <h2 className="text-lg font-medium">Configurações</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Seção de Publicação */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Publicação</h3>
            <div>
              <Label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</Label>
              <Select value={formData.status || 'draft'} onValueChange={handleStatusChange} disabled={isLoading}>
                <SelectTrigger className="mt-1 w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.status === 'published' && (
              <div>
                <Label htmlFor="published_at" className="text-sm font-medium text-gray-700 dark:text-gray-300">Agendar</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal mt-1", !selectedPublishedDate && "text-muted-foreground")} disabled={isLoading}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedPublishedDate ? format(selectedPublishedDate, "PPP", { locale: ptBR }) : <span>Imediatamente</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={selectedPublishedDate} onSelect={handlePublishedDateChange} initialFocus disabled={isLoading} /></PopoverContent>
                </Popover>
              </div>
            )}
          </div>
          
          <hr className="dark:border-gray-700"/>

          {/* Seção de Organização */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organização</h3>
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Categorias</Label>
              <MultiSelectCheckbox options={categoryOptions} selectedValues={formData.category_ids?.map(id => id.toString()) || []} onChange={handleCategoriesChange} placeholder="Selecione categorias" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</Label>
              <MultiSelectCheckbox options={tagOptions} selectedValues={formData.tag_ids?.map(id => id.toString()) || []} onChange={handleTagsChange} placeholder="Selecione tags" className="mt-1" />
            </div>
          </div>

          <hr className="dark:border-gray-700"/>

          {/* Seção de Mídia e Resumo */}
          <div className="space-y-4">
             <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mídia & Resumo</h3>
            <div>
              <Label htmlFor="cover_image_file" className="text-sm font-medium text-gray-700 dark:text-gray-300">Imagem de Capa</Label>
              <Input id="cover_image_file" name="cover_image_file" type="file" onChange={handleFileChange} accept="image/*" disabled={isLoading || uploading} className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-700 file:text-violet-700 dark:file:text-violet-100 hover:file:bg-violet-100 dark:hover:file:bg-violet-600" />
              {uploading && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Enviando...</p>}
              {filePreview && <div className="mt-2"><img src={filePreview} alt="Preview" className="max-h-32 rounded-md border dark:border-gray-700" /></div>}
            </div>
            <div>
              <Label htmlFor="excerpt" className="text-sm font-medium text-gray-700 dark:text-gray-300">Resumo (Excerpt)</Label>
              <Textarea id="excerpt" name="excerpt" value={formData.excerpt || ''} onChange={handleChange} rows={4} disabled={isLoading} placeholder="Um breve resumo do post..." className="mt-1" />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300 px-4 py-3 rounded-md text-sm">
              <p>{error}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
} 