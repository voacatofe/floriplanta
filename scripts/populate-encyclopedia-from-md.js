/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!');
  console.log('Certifique-se de que NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY estão definidas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Função para gerar slug
function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplos
    .trim();
}

// Função para determinar categoria baseada em palavras-chave
function determineCategory(term, definition, categoryText) {
  // Se a categoria já está explícita no texto
  if (categoryText) {
    if (categoryText.includes('Saúde') || categoryText.includes('Farmacologia') || categoryText.includes('Efeito terapêutico')) {
      return 'Saúde';
    }
    if (categoryText.includes('Química') || categoryText.includes('Composto') || categoryText.includes('Fitocanabinoide')) {
      return 'Química';
    }
    if (categoryText.includes('Legislação') || categoryText.includes('Jurídico') || categoryText.includes('Política')) {
      return 'Legislação';
    }
  }

  // Palavras-chave para classificação automática
  const healthKeywords = [
    'medicamento', 'terapêutico', 'tratamento', 'sintoma', 'doença', 'paciente',
    'analgésico', 'antiemético', 'ansiolítico', 'sedativo', 'anti-inflamatório',
    'dor', 'náusea', 'ansiedade', 'epilepsia', 'câncer', 'farmacologia'
  ];

  const chemistryKeywords = [
    'canabinoide', 'composto', 'molécula', 'química', 'receptor', 'terpeno',
    'THC', 'CBD', 'CBG', 'CBN', 'CBC', 'fitocanabinoide', 'endocanabinoide',
    'extração', 'concentrado', 'isolado'
  ];

  const legalKeywords = [
    'lei', 'legal', 'ilegal', 'crime', 'justiça', 'regulamentação', 'anvisa',
    'descriminalização', 'legalização', 'proibição', 'jurídico', 'tribunal',
    'convenção', 'política', 'habeas corpus'
  ];

  const combinedText = `${term} ${definition}`.toLowerCase();

  // Contagem de palavras-chave por categoria
  const healthScore = healthKeywords.filter(keyword => combinedText.includes(keyword)).length;
  const chemistryScore = chemistryKeywords.filter(keyword => combinedText.includes(keyword)).length;
  const legalScore = legalKeywords.filter(keyword => combinedText.includes(keyword)).length;

  // Retorna a categoria com maior pontuação
  if (healthScore >= chemistryScore && healthScore >= legalScore) {
    return 'Saúde';
  } else if (chemistryScore >= legalScore) {
    return 'Química';
  } else {
    return 'Legislação';
  }
}

// Função para extrair termos relacionados
function extractRelatedTerms(relationText) {
  if (!relationText) return [];
  
  // Remove "Relação com outras palavras:" e divide por vírgulas
  const cleanText = relationText
    .replace(/^.*?relação com outras palavras:?\s*/i, '')
    .replace(/\*\*/g, '') // Remove asteriscos
    .trim();
  
  if (!cleanText) return [];
  
  return cleanText
    .split(',')
    .map(term => term.trim())
    .filter(term => term.length > 0)
    .map(term => {
      // Remove texto entre parênteses (explicações)
      return term.replace(/\s*\([^)]*\)/g, '').trim();
    })
    .filter(term => term.length > 0);
}

// Função para processar o arquivo markdown
function parseEncyclopediaFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const terms = [];
  
  // Dividir o conteúdo em seções por letras/termos
  const sections = content.split(/\n\*\*([^*]+)\*\*\s*\n/);
  
  for (let i = 1; i < sections.length; i += 2) {
    const termName = sections[i].trim();
    const termContent = sections[i + 1];
    
    if (!termName || !termContent) continue;
    
    // Pular cabeçalhos de letras (A, B, C, etc.)
    if (termName.length === 1 && /^[A-Z]$/.test(termName)) continue;
    
    // Extrair definição (primeiro parágrafo)
    const paragraphs = termContent.split('\n\n').filter(p => p.trim());
    let definition = '';
    let category = '';
    let relatedTerms = [];
    
    for (const paragraph of paragraphs) {
      const trimmed = paragraph.trim();
      
      if (trimmed.startsWith('**Categoria:**')) {
        category = trimmed.replace('**Categoria:**', '').trim();
      } else if (trimmed.startsWith('**Relação com outras palavras')) {
        relatedTerms = extractRelatedTerms(trimmed);
      } else if (!definition && !trimmed.startsWith('**') && trimmed.length > 50) {
        // Primeira definição substancial encontrada
        definition = trimmed;
      }
    }
    
    // Se não encontrou definição no primeiro parágrafo, pega o primeiro texto substancial
    if (!definition) {
      for (const paragraph of paragraphs) {
        const trimmed = paragraph.trim();
        if (!trimmed.startsWith('**') && trimmed.length > 50) {
          definition = trimmed;
          break;
        }
      }
    }
    
    if (definition) {
      // Limpar a definição de referências e formatação
      definition = definition
        .replace(/\d+\s*$/g, '') // Remove números de referência no final
        .replace(/\s+/g, ' ') // Normaliza espaços
        .trim();
      
      const determinedCategory = determineCategory(termName, definition, category);
      
      terms.push({
        term: termName,
        slug: generateSlug(termName),
        definition: definition,
        category: determinedCategory,
        related_terms: relatedTerms,
        meta_description: definition.substring(0, 160) + (definition.length > 160 ? '...' : '')
      });
    }
  }
  
  return terms;
}

// Função principal
async function populateEncyclopedia() {
  try {
    console.log('🔄 Iniciando população da enciclopédia...');
    
    // Caminho para o arquivo da enciclopédia
    const encyclopediaFile = path.join(__dirname, '..', 'Enciclopédia de Termos Canábicos.md');
    
    if (!fs.existsSync(encyclopediaFile)) {
      console.error('❌ Arquivo da enciclopédia não encontrado:', encyclopediaFile);
      return;
    }
    
    console.log('📖 Processando arquivo da enciclopédia...');
    const terms = parseEncyclopediaFile(encyclopediaFile);
    
    console.log(`✅ ${terms.length} termos extraídos do arquivo`);
    
    // Verificar se a tabela existe
    const { data: tableExists } = await supabase
      .from('encyclopedia_terms_new')
      .select('count', { count: 'exact', head: true });
    
    if (!tableExists && tableExists !== 0) {
      console.error('❌ Tabela encyclopedia_terms_new não encontrada. Execute o script de migração primeiro.');
      return;
    }
    
    // Limpar tabela existente (opcional)
    console.log('🧹 Limpando dados existentes...');
    await supabase.from('encyclopedia_terms_new').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    console.log('💾 Inserindo termos na base de dados...');
    
    // Inserir em lotes de 50 para evitar timeouts
    const batchSize = 50;
    let inserted = 0;
    
    for (let i = 0; i < terms.length; i += batchSize) {
      const batch = terms.slice(i, i + batchSize);
      
             const { error } = await supabase
         .from('encyclopedia_terms_new')
         .insert(batch);
       
       if (error) {
         console.error(`❌ Erro ao inserir lote ${Math.floor(i/batchSize) + 1}:`, error);
         continue;
       }
      
      inserted += batch.length;
      console.log(`✅ Inseridos ${inserted}/${terms.length} termos`);
    }
    
    // Estatísticas finais
    const { data: stats } = await supabase
      .from('encyclopedia_terms_new')
      .select('category')
      .eq('is_active', true);
    
    const categoryStats = {};
    stats?.forEach(term => {
      categoryStats[term.category] = (categoryStats[term.category] || 0) + 1;
    });
    
    console.log('\n📊 Estatísticas da enciclopédia:');
    console.log(`Total de termos: ${stats?.length || 0}`);
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`${category}: ${count} termos`);
    });
    
    console.log('\n🎉 População da enciclopédia concluída com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante a população:', error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  populateEncyclopedia();
}

module.exports = { populateEncyclopedia, parseEncyclopediaFile }; 