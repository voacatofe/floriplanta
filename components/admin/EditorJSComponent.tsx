'use client';

import React, { useEffect, useRef, memo } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { type SupabaseClient } from '@supabase/supabase-js';
import './EditorJSComponent.css';
// @ts-expect-error - Header types may not be fully compatible
import Header from '@editorjs/header';
// @ts-expect-error - Paragraph types may not be fully compatible
import Paragraph from '@editorjs/paragraph';
// @ts-expect-error - List types may not be fully compatible
import List from '@editorjs/list';
// @ts-expect-error - Quote types may not be fully compatible
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
// @ts-expect-error - CodeTool types may not be fully compatible
import CodeTool from '@editorjs/code';
// @ts-expect-error - Delimiter types may not be fully compatible
import Delimiter from '@editorjs/delimiter';
// @ts-expect-error - Embed types may not be fully compatible
import Embed from '@editorjs/embed';
// @ts-expect-error - Checklist types may not be fully compatible
import Checklist from '@editorjs/checklist';
// @ts-expect-error - Table types may not be fully compatible
import Table from '@editorjs/table';

interface EditorProps {
  value: OutputData | undefined;
  onChange: (data: OutputData) => void;
  holderId?: string;
  readOnly?: boolean;
  supabaseClient: SupabaseClient;
}

const EDITOR_HOLDER_ID = 'editorjs-container';

const EditorJSComponent: React.FC<EditorProps> = ({ 
  value, 
  onChange, 
  holderId = EDITOR_HOLDER_ID, 
  readOnly = false, 
  supabaseClient
}) => {
  const editorInstanceRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!editorInstanceRef.current) {
        const editor = new EditorJS({
          holder: holderId,
          data: value,
          readOnly: readOnly,
          onReady: () => {
            console.log('Editor.js is ready to work!');
          },
          onChange: async (api, _event) => {
            if (onChange) {
              const savedData = await api.saver.save();
              onChange(savedData);
            }
          },
          tools: {
            header: Header,
            paragraph: Paragraph,
            list: List,
            quote: Quote,
            image: {
              class: ImageTool,
              config: {
                uploader: {
                  uploadByFile: async (file: File) => {
                    if (!supabaseClient) {
                      console.error("Supabase client não fornecido para o Editor.js uploader.");
                      return {
                        success: 0,
                        file: { url: '' },
                        message: 'Supabase client não configurado para upload.'
                      };
                    }
                    
                    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`.toLowerCase();
                    const filePath = `editorjs_uploads/${fileName}`; 
                    
                    try {
                      const { data: _data, error } = await supabaseClient.storage
                        .from('blogimages')
                        .upload(filePath, file, {
                          cacheControl: '3600',
                          upsert: false
                        });

                      if (error) {
                        console.error('Supabase upload error no Editor.js:', error);
                        return { success: 0, file: { url: '' }, message: error.message };
                      }

                      const { data: publicUrlData } = supabaseClient.storage
                        .from('blogimages')
                        .getPublicUrl(filePath);

                      if (publicUrlData && publicUrlData.publicUrl) {
                        return { success: 1, file: { url: publicUrlData.publicUrl } };
                      } else {
                        return { success: 0, file: { url: '' }, message: 'Não foi possível obter a URL pública da imagem.' };
                      }
                    } catch (e) {
                       console.error('Erro no bloco catch do upload do Editor.js:', e);
                       return { success: 0, file: { url: '' }, message: (e as Error).message };
                    }
                  },
                }
              }
            },
            code: CodeTool,
            delimiter: Delimiter,
            // @ts-expect-error - EditorJS plugin configuration lacks TypeScript definitions
            embed: Embed,
            checklist: Checklist,
            table: Table,
          },
        });
        editorInstanceRef.current = editor;
      }
    }

    return () => {
      if (editorInstanceRef.current && typeof editorInstanceRef.current.destroy === 'function') {
        editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, [holderId, value, onChange, readOnly, supabaseClient]);

  return (
    <div id={holderId} className="min-h-[300px]" />
  );
};

export default memo(EditorJSComponent);