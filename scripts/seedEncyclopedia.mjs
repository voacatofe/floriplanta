import { PrismaClient } from '../lib/generated/prisma/index.js';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function seedEncyclopedia() {
  try {
    console.log('🌱 Iniciando seed da enciclopédia...');

    // Ler o arquivo SQL
    const sqlContent = fs.readFileSync(
      path.join(process.cwd(), 'encyclopedia_terms_rows.sql'),
      'utf-8'
    );

    // Extrair os dados do INSERT SQL
    const insertMatch = sqlContent.match(/INSERT INTO.*?VALUES\s+(.+)$/s);
    if (!insertMatch) {
      throw new Error('Não foi possível extrair dados do arquivo SQL');
    }

    // Parse dos valores - cada linha é um termo
    const valuesString = insertMatch[1];
    
    // Dividir por '), (' para separar os registros
    const records = valuesString
      .split('), (')
      .map((record, index, array) => {
        // Limpar parênteses do primeiro e último registro
        if (index === 0) record = record.replace(/^\(/, '');
        if (index === array.length - 1) record = record.replace(/\)$/, '');
        return record;
      });

    console.log(`📊 Encontrados ${records.length} termos para inserir`);

    // Processar cada registro
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      
      try {
        // Parse manual dos valores (considerando aspas e escapes)
        const values = parseRecord(record);
        
        if (values.length !== 11) {
          console.warn(`⚠️  Registro ${i + 1} tem ${values.length} campos, esperado 11. Pulando...`);
          continue;
        }

        const [id, term, slug, definition, category, related_terms, created_at, updated_at, is_active, meta_description, unresolved_related_terms] = values;

        // Converter arrays JSON
        const relatedTermsArray = related_terms === 'NULL' ? [] : JSON.parse(related_terms);
        const unresolvedRelatedTermsArray = unresolved_related_terms === 'NULL' ? [] : JSON.parse(unresolved_related_terms);

        // Inserir no banco
        await prisma.encyclopediaTerm.create({
          data: {
            id,
            term,
            slug,
            definition,
            category,
            related_terms: relatedTermsArray,
            created_at: new Date(created_at),
            updated_at: new Date(updated_at),
            is_active: is_active === 'true',
            meta_description: meta_description === 'NULL' ? null : meta_description,
            unresolved_related_terms: unresolvedRelatedTermsArray
          }
        });

        console.log(`✅ Inserido: ${term}`);
      } catch (error) {
        console.error(`❌ Erro ao processar registro ${i + 1}:`, error.message);
        console.error(`Registro: ${record.substring(0, 100)}...`);
      }
    }

    console.log('🎉 Seed da enciclopédia concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Função para fazer parse manual dos valores do SQL
function parseRecord(record) {
  const values = [];
  let current = '';
  let inQuotes = false;
  let escapeNext = false;
  
  for (let i = 0; i < record.length; i++) {
    const char = record[i];
    
    if (escapeNext) {
      current += char;
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      current += char;
      continue;
    }
    
    if (char === "'") {
      if (inQuotes) {
        // Verificar se é escape de aspas ('') 
        if (record[i + 1] === "'") {
          current += "'";
          i++; // pular a próxima aspa
          continue;
        } else {
          inQuotes = false;
        }
      } else {
        inQuotes = true;
      }
      continue;
    }
    
    if (!inQuotes && char === ',') {
      values.push(current.trim());
      current = '';
      continue;
    }
    
    current += char;
  }
  
  // Adicionar o último valor
  if (current.trim()) {
    values.push(current.trim());
  }
  
  return values;
}

seedEncyclopedia()
  .catch((error) => {
    console.error('❌ Falha no seed:', error);
    process.exit(1);
  });