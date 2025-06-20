/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '.env.local' });
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
  if (!text) return '';
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
  if (healthScore >= chemistryScore && healthScore >= legalScore && healthScore > 0) {
    return 'Saúde';
  } else if (chemistryScore >= legalScore && chemistryScore > 0) {
    return 'Química';
  } else if (legalScore > 0) {
    return 'Legislação';
  }
  // Fallback se nenhuma keyword for encontrada (pouco provável com bons keywords)
  return 'Química'; // Ou uma categoria padrão ou lançar erro
}

// Função para extrair NOMES de termos relacionados do texto
function extractRelatedTermNames(relationText) {
  if (!relationText) return [];
  
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
      return term.replace(/\s*\([^)]*\)/g, '').trim(); // Remove texto entre parênteses
    })
    .filter(term => term.length > 0);
}

// Função para processar o arquivo markdown
function parseEncyclopediaFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const preliminaryTerms = [];
  const termToSlugMap = new Map();

  const sections = content.split(/\n\*\*([^*]+)\*\*\s*\n/);
  for (let i = 1; i < sections.length; i += 2) {
    const termName = sections[i].trim();
    const termContent = sections[i + 1];
    if (!termName || !termContent || (termName.length === 1 && /^[A-Z]$/.test(termName))) continue;
    
    const slug = generateSlug(termName);
    termToSlugMap.set(termName, slug);

    const paragraphs = termContent.split('\n\n').filter(p => p.trim());
    let definitionParts = [];
    let categoryText = '';
    let relatedTermNamesRawText = '';
    let collectingDefinition = true;

    for (const para of paragraphs) {
      const trimmed = para.trim();
      if (trimmed.startsWith('**Categoria:**')) {
        categoryText = trimmed.replace('**Categoria:**', '').trim();
        collectingDefinition = false; // Parar de coletar definição ao encontrar Categoria
      } else if (trimmed.startsWith('**Relação com outras palavras')) {
        relatedTermNamesRawText = trimmed;
        collectingDefinition = false; // Parar de coletar definição ao encontrar Relação
      } else if (collectingDefinition && trimmed.length > 0) {
        // Se ainda estamos coletando definição e o parágrafo não é vazio
        definitionParts.push(trimmed);
      }
    }
    
    const fullDefinition = definitionParts.join('\n\n'); // Juntar partes da definição com quebra de parágrafo

    if (fullDefinition) {
      const cleanFullDefinition = fullDefinition.replace(/\d+\s*$/g, '').replace(/\s+/g, ' ').trim(); // Limpeza final
      const determinedCategory = determineCategory(termName, cleanFullDefinition, categoryText);
      preliminaryTerms.push({
        term: termName,
        slug: slug,
        definition: cleanFullDefinition,
        category: determinedCategory,
        related_terms_raw_names: extractRelatedTermNames(relatedTermNamesRawText),
        meta_description: cleanFullDefinition.substring(0, 160) + (cleanFullDefinition.length > 160 ? '...' : ''),
      });
    }
  }

  // Segunda passagem: Processar as relações para cada termo
  const finalTerms = preliminaryTerms.map(pTerm => {
    const resolvedRelatedSlugs = [];
    const unresolvedRelatedNames = [];

    pTerm.related_terms_raw_names.forEach(relatedName => {
      const relatedSlug = termToSlugMap.get(relatedName); // Tenta encontrar o slug do termo relacionado
      if (relatedSlug && relatedSlug !== pTerm.slug) { // Se encontrou e não é auto-referência
        resolvedRelatedSlugs.push(relatedSlug);
      } else if (!relatedSlug) { // Se não encontrou o termo no mapa
        unresolvedRelatedNames.push(relatedName);
      }
    });

    return {
      term: pTerm.term,
      slug: pTerm.slug,
      definition: pTerm.definition,
      category: pTerm.category,
      related_terms: resolvedRelatedSlugs, // Array de slugs resolvidos
      unresolved_related_terms: unresolvedRelatedNames, // Array de nomes não resolvidos
      meta_description: pTerm.meta_description,
    };
  });

  return finalTerms;
}

// Função principal
async function populateEncyclopedia() {
  try {
    console.log('🔄 Iniciando população da enciclopédia...');
    
    const encyclopediaFile = path.join(__dirname, '..', 'Enciclopédia de Termos Canábicos.md');
    
    if (!fs.existsSync(encyclopediaFile)) {
      console.error('❌ Arquivo da enciclopédia não encontrado:', encyclopediaFile);
      return;
    }
    
    console.log('📖 Processando arquivo da enciclopédia...');
    const termsToInsert = parseEncyclopediaFile(encyclopediaFile);
    
    if (termsToInsert.length === 0) {
        console.log('⚠️ Nenhum termo válido encontrado no arquivo para processar.');
        return;
    }
    console.log(`✅ ${termsToInsert.length} termos extraídos e processados do arquivo.`);
    
    const { error: tableCheckError } = await supabase
      .from('encyclopedia_terms')
      .select('id')
      .limit(1);

    if (tableCheckError && tableCheckError.code === '42P01') {
      console.error('❌ Tabela encyclopedia_terms não encontrada. Por favor, crie a tabela primeiro.');
      console.error('Detalhes do erro:', tableCheckError.message);
      return;
    } else if (tableCheckError) {
      console.error('❌ Erro ao verificar a tabela encyclopedia_terms:', tableCheckError.message);
      return;
    }
    console.log('✅ Tabela encyclopedia_terms encontrada.');
    
    console.log('🧹 Limpando dados existentes...');
    const { error: deleteError } = await supabase.from('encyclopedia_terms').delete().neq('id', '00000000-0000-0000-0000-000000000000'); 
    
    if (deleteError) {
        console.warn('⚠️  Aviso ao limpar dados da tabela:', deleteError.message, '(Pode ser normal se a tabela já estava vazia)');
    } else {
        console.log('🗑️ Dados antigos removidos (ou tabela já estava vazia).');
    }

    console.log('💾 Inserindo termos na base de dados...');
    
    const batchSize = 50;
    let insertedCount = 0;
    
    for (let i = 0; i < termsToInsert.length; i += batchSize) {
      const batch = termsToInsert.slice(i, i + batchSize);
      
      // Garantir que related_terms seja sempre um array, mesmo que vazio
      const batchPrepared = batch.map(term => ({
        ...term,
        related_terms: Array.isArray(term.related_terms) ? term.related_terms : [],
        unresolved_related_terms: Array.isArray(term.unresolved_related_terms) ? term.unresolved_related_terms : [] // Garante que é array
      }));

      const { error: insertError } = await supabase
        .from('encyclopedia_terms')
        .insert(batchPrepared);
      
      if (insertError) {
        console.error(`❌ Erro ao inserir lote ${Math.floor(i/batchSize) + 1}:`, insertError);
        console.error('Detalhes do lote problemático:', JSON.stringify(batchPrepared, null, 2));
        // Decidir se quer continuar com outros lotes ou parar. Por enquanto, continua.
      } else {
        insertedCount += batch.length;
        console.log(`✅ Inseridos ${insertedCount}/${termsToInsert.length} termos`);
      }
    }
    
    // Estatísticas finais
    try {
      const { count: totalManualCount, error: totalManualError } = await supabase
          .from('encyclopedia_terms')
          .select('*', { count: 'exact', head: true });

      if (!totalManualError && totalManualCount !== null) {
          console.log(`
📊 Total de termos na tabela: ${totalManualCount}`);
      } else if (totalManualError) {
          console.warn('⚠️ Não foi possível obter a contagem total de termos:', totalManualError.message);
      }

      const { data: categoryCounts, error: categoryCountsError } = await supabase
        .rpc('count_encyclopedia_terms_by_category'); // Supondo que você crie uma função SQL para isso

      if (!categoryCountsError && categoryCounts) {
        console.log('Categorias e contagens:');
        categoryCounts.forEach(cat => {
          console.log(`${cat.category}: ${cat.count} termos`);
        });
      } else if (categoryCountsError) {
         console.warn('⚠️ Não foi possível obter contagem por categoria via RPC:', categoryCountsError.message);
         console.log('   (Você pode criar uma função SQL chamada `count_encyclopedia_terms_by_category` para obter essa estatística.)');
         console.log('   Exemplo de função SQL:');
         console.log('   CREATE OR REPLACE FUNCTION count_encyclopedia_terms_by_category()');
         console.log('   RETURNS TABLE(category TEXT, count BIGINT) AS $$');
         console.log('   BEGIN');
         console.log('     RETURN QUERY SELECT et.category, COUNT(*) FROM encyclopedia_terms et GROUP BY et.category;');
         console.log('   END; $$ LANGUAGE plpgsql;');

      }

    } catch (statsError) {
        console.warn('⚠️ Erro ao tentar buscar estatísticas detalhadas:', statsError.message);
    }
    
    console.log('\n🎉 População da enciclopédia concluída!');
    
  } catch (error) {
    console.error('❌ Erro fatal durante a população:', error);
    process.exit(1); // Sair com erro em caso de falha não tratada
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  populateEncyclopedia();
}

module.exports = { populateEncyclopedia, parseEncyclopediaFile, generateSlug }; 