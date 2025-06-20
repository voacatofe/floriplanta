/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { parse } = require('csv-parse/sync'); // Para ler CSV

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Função para gerar slug (se necessário, caso o CSV não tenha slugs perfeitos)
function generateSlug(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Função para determinar categoria (manter sua lógica completa se for usar)
function determineCategory(term, definition) {
  const keywords = {
    Saúde: ['medicamento', 'terapêutico', 'tratamento', 'sintoma', 'doença', 'paciente', 'analgésico', 'antiemético', 'ansiolítico', 'sedativo', 'anti-inflamatório', 'dor', 'náusea', 'ansiedade', 'epilepsia', 'câncer', 'farmacologia', 'gaba', 'adrenalina', 'epinefrina', 'norepinefrina', 'noradrenalina', 'esclerose', 'interações medicamentosas', 'tept', 'tea', 'endometriose', 'síndrome de hiperêmese', 'titulação', 'homeostase', 'comestível', 'via de administração', 'vaporização', 'extratos de cannabis', 'óleo de cannabis'],
    Química: ['canabinoide', 'composto', 'molécula', 'química', 'receptor', 'terpeno', 'thc', 'cbd', 'cbg', 'cbn', 'cbc', 'fitocanabinoide', 'endocanabinoide', 'extração', 'concentrado', 'isolado', 'aea', 'anandamida', 'cb1', 'cb2', 'chemovar', 'dronabinol', 'flavonoides', 'ghrelin', 'glutamato', 'histamina', 'humuleno', 'limoneno', 'linalol', 'mirceno', 'nabilone', 'nerolidol', 'ocimeno', 'pineno', 'serotonina', 'terpinoleno', 'thca', 'thcv', 'ruderalis', 'sativa', 'indica', 'faah', 'descarboxilação', 'efeito entourage', 'efeito bifásico', 'agonista', 'antagonista', 'modulador alostérico', 'biodisponibilidade', 'arachidonoylglycerol', 'acetilcolina', 'brácteas', 'budder', 'canabinoides menores e ácidos', 'cbda', 'cbga', 'cbdv', 'delta-8 thc', 'delta-8-tetraidrocanabinol', 'ácido canabidiólico', 'canabidivarina', 'ácido canabigerólico', 'ácido tetraidrocanabinólico', 'beta-cariofileno', 'cariofileno', 'bisabolol', 'geraniol'],
    Legislação: ['lei', 'legal', 'ilegal', 'crime', 'justiça', 'regulamentação', 'anvisa', 'descriminalização', 'legalização', 'proibição', 'jurídico', 'tribunal', 'convenção', 'política', 'habeas corpus', 'cultivo medicinal', 'salvo-conduto', 'onu – convenções de drogas', 'portaria svs/ms 344/1998', 'jife', 'pl 399/2015', 'rdc 327/2019', 'rdc 660/2022', 'marcha da maconha', 'stf', 'acórdãos', 'competência', 'legislação estadual', 'tráfico ilícito', 'hub canábico', 'the green hub']
  };
  const combinedText = `${term} ${definition}`.toLowerCase();
  let bestCategory = 'Química';
  let maxScore = 0;
  for (const [cat, kws] of Object.entries(keywords)) {
    const score = kws.filter(kw => combinedText.includes(kw.toLowerCase())).length;
    if (score > maxScore) {
      maxScore = score;
      bestCategory = cat;
    }
  }
  return bestCategory;
}

// Função para converter string de array JSON para array JS
function parseStringArray(strArray) {
  if (!strArray || typeof strArray !== 'string') return [];
  try {
    const parsed = JSON.parse(strArray);
    return Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : [];
  } catch (e) {
    // Se não for JSON válido, tentar split por vírgula (para formatos mais simples como "item1,item2")
    if (strArray.startsWith('[') && strArray.endsWith(']')) {
        // Remover colchetes e dividir
        return strArray.substring(1, strArray.length -1).split(',').map(s => s.trim().replace(/^"|"$/g, '')).filter(s => s);
    } else if (!strArray.includes('[') && !strArray.includes(']') && strArray.includes(',')) {
        return strArray.split(',').map(s => s.trim()).filter(s => s);
    }
    console.warn(`⚠️  Não foi possível parsear string de array: ${strArray}. Retornando array vazio.`);
    return [];
  }
}

// Função principal para popular a partir do CSV
async function populateFromCsv(csvFilePath) {
  try {
    console.log(`🔄 Iniciando população da enciclopédia a partir do CSV: ${csvFilePath}`);
    
    if (!fs.existsSync(csvFilePath)) {
      console.error('❌ Arquivo CSV não encontrado:', csvFilePath);
      return;
    }

    const csvContent = fs.readFileSync(csvFilePath, { encoding: 'utf8' });
    const records = parse(csvContent, {
      columns: true, // Trata a primeira linha como cabeçalho das colunas
      skip_empty_lines: true,
      trim: true,
    });

    if (records.length === 0) {
      console.log('⚠️ Nenhum registro encontrado no arquivo CSV.');
      return;
    }
    console.log(`✅ ${records.length} registros lidos do CSV.`);

    // Mapear todos os slugs existentes no CSV para facilitar a resolução de termos relacionados
    const termToSlugMap = new Map();
    records.forEach(record => {
      if (record.term && record.slug) {
        termToSlugMap.set(record.term.trim(), record.slug.trim());
      }
    });

    const termsToInsert = records.map(record => {
      const term = record.term ? record.term.trim() : null;
      let slug = record.slug ? record.slug.trim() : null;
      const definition = record.definition ? record.definition.trim() : null;
      let category = record.category ? record.category.trim() : (term && definition ? determineCategory(term, definition) : 'Química');
      
      // Processar related_terms e unresolved_related_terms do CSV
      let related_terms = parseStringArray(record.related_terms);
      let unresolved_related_terms = parseStringArray(record.unresolved_related_terms);

      if (!term || !definition) {
        console.warn('⚠️ Registro ignorado por falta de termo ou definição:', record);
        return null; // Ignorar registros incompletos
      }

      if (!slug) slug = generateSlug(term); // Gerar slug se não estiver no CSV
      
      return {
        term,
        slug,
        definition,
        category,
        meta_description: definition.substring(0, 160) + (definition.length > 160 ? '...' : ''),
        related_terms,
        unresolved_related_terms,
        is_active: true, // Padrão
      };
    }).filter(record => record !== null); // Remover nulos (registros ignorados)

    if (termsToInsert.length === 0) {
      console.log('⚠️ Nenhum termo válido para inserir após o processamento.');
      return;
    }
    console.log(`ℹ️ ${termsToInsert.length} termos prontos para inserção.`);

    // Limpar tabela existente (opcional, mas recomendado)
    console.log('🧹 Limpando dados existentes da tabela encyclopedia_terms...');
    const { error: deleteError } = await supabase.from('encyclopedia_terms').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteError) console.warn('⚠️  Aviso ao limpar dados da tabela:', deleteError.message);
    else console.log('🗑️ Dados antigos removidos (ou tabela já estava vazia).');

    // Inserir em lotes usando UPSERT para lidar com duplicatas
    console.log('💾 Inserindo termos na base de dados usando UPSERT...');
    const batchSize = 50;
    let insertedCount = 0;
    for (let i = 0; i < termsToInsert.length; i += batchSize) {
      const batch = termsToInsert.slice(i, i + batchSize);
      const { error: upsertError } = await supabase
        .from('encyclopedia_terms')
        .upsert(batch, { 
          onConflict: 'slug',
          ignoreDuplicates: false 
        });
      if (upsertError) {
        console.error(`❌ Erro ao fazer upsert do lote ${Math.floor(i / batchSize) + 1}:`, upsertError);
        console.error('Detalhes do lote problemático:', JSON.stringify(batch, null, 2));
      } else {
        insertedCount += batch.length;
        console.log(`✅ Processados ${insertedCount}/${termsToInsert.length} termos`);
      }
    }

    // Log de estatísticas e termos não resolvidos (similar ao script anterior)
    try {
        const { count: totalManualCount, error: totalManualError } = await supabase.from('encyclopedia_terms').select('*', { count: 'exact', head: true });
        if (!totalManualError && totalManualCount !== null) console.log(`
📊 Total de termos na tabela: ${totalManualCount}`);
        else if (totalManualError) console.warn('⚠️ Não foi possível obter a contagem total de termos:', totalManualError.message);
  
        const { data: termsWithUnresolved, error: unresolvedError } = await supabase
          .from('encyclopedia_terms')
          .select('term, unresolved_related_terms')
          .not('unresolved_related_terms', 'eq', '{}'); 
  
        if (!unresolvedError && termsWithUnresolved && termsWithUnresolved.length > 0) {
          console.log('\n🔍 Termos com relações pendentes de criação (sugestões de novos verbetes):');
          termsWithUnresolved.forEach(t => {
            if (t.unresolved_related_terms && t.unresolved_related_terms.length > 0) {
              console.log(`  - Verbete "${t.term}" menciona: ${t.unresolved_related_terms.join(', ')}`);
            }
          });
        } else if (unresolvedError) {
          console.warn('⚠️ Não foi possível verificar termos com relações pendentes:', unresolvedError.message);
        }
        // Lógica para contagem por categoria RPC (mantida)
        const { data: categoryCounts, error: categoryCountsError } = await supabase
          .rpc('count_encyclopedia_terms_by_category'); 
  
        if (!categoryCountsError && categoryCounts) {
          console.log('Categorias e contagens:');
          categoryCounts.forEach(cat => {
            console.log(`${cat.category}: ${cat.count} termos`);
          });
        } else if (categoryCountsError) {
           console.warn('⚠️ Não foi possível obter contagem por categoria via RPC:', categoryCountsError.message);
        }
  
      } catch (statsError) {
        console.warn('⚠️ Erro ao tentar buscar estatísticas detalhadas:', statsError.message);
      }

    console.log('\n🎉 População da enciclopédia a partir do CSV concluída!');

  } catch (error) {
    console.error('❌ Erro fatal durante a população via CSV:', error);
    process.exit(1);
  }
}

// Para executar este script:
// node scripts/populate-from-csv.cjs nome_do_arquivo.csv
if (require.main === module) {
  const csvFileName = process.argv[2]; // Pega o nome do arquivo da linha de comando
  if (!csvFileName) {
    console.error('❌ Por favor, forneça o nome do arquivo CSV como argumento.');
    console.log('Exemplo: node scripts/populate-from-csv.cjs seu_arquivo.csv');
    process.exit(1);
  }
  const csvFilePath = path.join(__dirname, '..', csvFileName); // Assume que o CSV está na raiz do projeto
  populateFromCsv(csvFilePath);
}

module.exports = { populateFromCsv }; 