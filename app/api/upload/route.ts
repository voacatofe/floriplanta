import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;
  const folder: string | null = data.get('folder') as string | null;

  if (!file) {
    return NextResponse.json({ success: false, error: 'Nenhum arquivo enviado.' });
  }

  // Define o diretório de upload. Usa a variável de ambiente ou um padrão.
  const uploadDir = process.env.UPLOADS_DIR || join(process.cwd(), 'public', 'uploads');
  const finalDir = folder ? join(uploadDir, folder) : uploadDir;

  // Garante que o diretório de destino exista
  try {
    await mkdir(finalDir, { recursive: true });
  } catch (error) {
    console.error('Erro ao criar diretório:', error);
    return NextResponse.json({ success: false, error: 'Falha ao criar diretório no servidor.' }, { status: 500 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Gera um nome de arquivo único para evitar conflitos
  const uniqueFilename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
  const filePath = join(finalDir, uniqueFilename);

  try {
    await writeFile(filePath, buffer);
    console.log(`Arquivo salvo em: ${filePath}`);

    // Gera a URL pública
    const publicUrl = folder 
      ? `/uploads/${folder}/${uniqueFilename}`
      : `/uploads/${uniqueFilename}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Erro ao salvar arquivo:', error);
    return NextResponse.json({ success: false, error: 'Falha ao salvar arquivo no servidor.' }, { status: 500 });
  }
} 