import { PrismaClient } from '../lib/generated/prisma/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

/**
 * Função para processar e importar dados da enciclopédia a partir do arquivo CSV
 */
async function importEncyclopediaFromCSV() {
  try {
    console.log('🌱 Iniciando importação dos termos da enciclopédia do CSV...');
    
    // Caminho para o arquivo CSV
    const csvPath = path.join(__dirname, '..', 'encyclopedia_terms_updated.csv');
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(csvPath)) {
      throw new Error(`Arquivo CSV não encontrado: ${csvPath}`);
    }
    
    // Ler o arquivo CSV
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    // Remover o cabeçalho
    const header = lines.shift();
    console.log('📋 Cabeçalho CSV:', header);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      try {
        // Parse da linha CSV (considerando que pode haver vírgulas dentro das aspas)
        const csvRow = parseCSVLine(line);
        
        if (csvRow.length < 5) {
          console.warn(`⚠️ Linha ${i + 2} tem poucos campos:`, csvRow);
          continue;
        }
        
        const [term, slug, definition, related_terms, unresolved_related_terms] = csvRow;
        
        // Parse dos arrays JSON
        let relatedTermsArray = [];
        let unresolvedRelatedTermsArray = [];
        
        try {
          relatedTermsArray = related_terms ? JSON.parse(related_terms) : [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          console.warn(`⚠️ Erro ao fazer parse de related_terms na linha ${i + 2}:`, related_terms);
          relatedTermsArray = [];
        }
        
        try {
          unresolvedRelatedTermsArray = unresolved_related_terms ? JSON.parse(unresolved_related_terms) : [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          console.warn(`⚠️ Erro ao fazer parse de unresolved_related_terms na linha ${i + 2}:`, unresolved_related_terms);
          unresolvedRelatedTermsArray = [];
        }
        
        // Verificar se o termo já existe
        const existingTerm = await prisma.encyclopediaTerm.findUnique({
          where: { slug: slug.trim() }
        });
        
        if (existingTerm) {
          console.log(`⚠️ Termo já existe: ${term.trim()}`);
          continue;
        }
        
        // Criar o registro no banco
        await prisma.encyclopediaTerm.create({
          data: {
            term: term.trim(),
            slug: slug.trim(),
            definition: definition.trim(),
            category: 'Geral', // Categoria padrão, pode ser ajustada depois
            related_terms: relatedTermsArray,
            unresolved_related_terms: unresolvedRelatedTermsArray,
            is_active: true,
            meta_description: definition.trim().substring(0, 160) + (definition.length > 160 ? '...' : '')
          }
        });
        
        successCount++;
        
        if (successCount % 10 === 0) {
          console.log(`✅ Processados ${successCount} termos...`);
        }
        
      } catch (error) {
        errorCount++;
        console.error(`❌ Erro ao processar linha ${i + 2}:`, error.message);
        console.error('Linha:', line.substring(0, 100) + '...');
      }
    }
    
    console.log('\n🎉 Importação concluída!');
    console.log(`✅ Sucessos: ${successCount}`);
    console.log(`❌ Erros: ${errorCount}`);
    
    // Verificar total de registros
    const totalTerms = await prisma.encyclopediaTerm.count();
    console.log(`📊 Total de termos na base: ${totalTerms}`);
    
  } catch (error) {
    console.error('❌ Erro durante a importação:', error);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Função para fazer parse de uma linha CSV considerando aspas e vírgulas
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Aspas duplas escapadas
        current += '"';
        i += 2;
      } else {
        // Início ou fim de aspas
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      // Vírgula fora de aspas - fim do campo
      result.push(current);
      current = '';
      i++;
    } else {
      current += char;
      i++;
    }
  }
  
  // Adicionar o último campo
  result.push(current);
  
  return result;
}

// Executar a importação
importEncyclopediaFromCSV();