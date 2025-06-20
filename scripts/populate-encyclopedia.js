const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!');
  console.log('Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Função para criar slug
function createSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-'); // Remove hífens duplicados
}

// Função para determinar categoria automaticamente
function determineCategory(term, definition) {
  const healthKeywords = [
    'medicamento', 'tratamento', 'terapia', 'doença', 'sintoma', 'paciente', 
    'médico', 'clínico', 'diagnóstico', 'analgésico', 'anti-inflamatório',
    'ansiolítico', 'anticonvulsivante', 'antipsicótico', 'neurológico',
    'psiquiátrico', 'oncológico', 'paliativo', 'dor', 'epilepsia', 'ansiedade',
    'depressão', 'câncer', 'glaucoma', 'esclerose', 'parkinson', 'alzheimer'
  ];
  
  const chemistryKeywords = [
    'composto', 'molécula', 'químico', 'cannabinoide', 'terpeno', 'flavonoide',
    'thc', 'cbd', 'cbc', 'cbg', 'cbn', 'thca', 'cbda', 'receptor', 'enzima',
    'metabolismo', 'síntese', 'extração', 'concentração', 'pureza', 'análise',
    'cromatografia', 'espectroscopia', 'isômero', 'enantiômero', 'delta',
    'mirceno', 'limoneno', 'pineno', 'linalol', 'cariofileno'
  ];
  
  const legalKeywords = [
    'lei', 'regulamentação', 'anvisa', 'prescrição', 'autorização', 'licença',
    'legal', 'ilegal', 'crime', 'penalização', 'legislação', 'decreto',
    'portaria', 'resolução', 'norma', 'fiscalização', 'controle', 'registro',
    'importação', 'cultivo', 'porte', 'tráfico', 'descriminalização',
    'legalização', 'regulamentado', 'controlado', 'proibido', 'permitido'
  ];

  const text = (term + ' ' + definition).toLowerCase();
  
  const healthScore = healthKeywords.filter(keyword => text.includes(keyword)).length;
  const chemistryScore = chemistryKeywords.filter(keyword => text.includes(keyword)).length;
  const legalScore = legalKeywords.filter(keyword => text.includes(keyword)).length;
  
  if (healthScore >= chemistryScore && healthScore >= legalScore) {
    return 'Saúde';
  } else if (chemistryScore >= legalScore) {
    return 'Química';
  } else {
    return 'Legislação';
  }
}

// Função para extrair termos relacionados do texto
function extractRelatedTerms(definition, allTerms) {
  const relatedTerms = [];
  const definitionLower = definition.toLowerCase();
  
  // Lista de termos comuns que devemos procurar
  const commonCannabisTerms = [
    'THC', 'CBD', 'CBG', 'CBC', 'CBN', 'THCA', 'CBDA',
    'Receptor CB1', 'Receptor CB2', 'Sistema Endocanabinoide',
    'Anandamida', 'Dronabinol', 'Nabilona', 'Epidiolex',
    'Terpenos', 'Mirceno', 'Limoneno', 'Pineno', 'Linalol', 'Cariofileno',
    'Cannabis sativa', 'Cannabis indica', 'Cannabis ruderalis',
    'Maconha', 'Hemp', 'Cânhamo', 'Haxixe', 'BHO', 'Rosin',
    'Vaporização', 'Edibles', 'Tintura', 'Óleo de Cannabis',
    'Cultivo', 'Autocultivo', 'Associação', 'Paciente',
    'ANVISA', 'Prescrição', 'Autorização', 'Importação'
  ];
  
  // Procurar por menções diretas desses termos
  commonCannabisTerms.forEach(term => {
    if (definitionLower.includes(term.toLowerCase()) && term !== allTerms.find(t => t.term === term)?.term) {
      relatedTerms.push(term);
    }
  });
  
  // Procurar por outros termos da lista que aparecem no texto
  allTerms.forEach(term => {
    if (term.term.length > 3 && // Evitar termos muito curtos
        definitionLower.includes(term.term.toLowerCase()) && 
        !relatedTerms.includes(term.term)) {
      relatedTerms.push(term.term);
    }
  });
  
  // Limitar a 8 termos relacionados para não ficar muito poluído
  return relatedTerms.slice(0, 8);
}

// Função para processar o arquivo da enciclopédia
function processEncyclopediaFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const terms = [];
  
  // Dividir o conteúdo em seções por categoria
  const sections = content.split(/#{1,2}\s+/);
  
  sections.forEach(section => {
    if (!section.trim()) return;
    
    const lines = section.split('\n').filter(line => line.trim());
    if (lines.length < 2) return;
    
    // Processar cada termo na seção
    let currentTerm = null;
    let currentDefinition = '';
    
    lines.forEach(line => {
      line = line.trim();
      
      // Verificar se é um novo termo (linha que começa com **termo**)
      const termMatch = line.match(/^\*\*([^*]+)\*\*/);
      
      if (termMatch) {
        // Salvar termo anterior se existir
        if (currentTerm && currentDefinition) {
          terms.push({
            term: currentTerm,
            definition: currentDefinition.trim(),
            slug: createSlug(currentTerm),
            category: determineCategory(currentTerm, currentDefinition),
            meta_description: currentDefinition.substring(0, 150) + '...'
          });
        }
        
        // Iniciar novo termo
        currentTerm = termMatch[1].trim();
        currentDefinition = '';
      } else if (line && !line.startsWith('#')) {
        // Adicionar à definição atual
        currentDefinition += (currentDefinition ? ' ' : '') + line;
      }
    });
    
    // Salvar último termo da seção
    if (currentTerm && currentDefinition) {
      terms.push({
        term: currentTerm,
        definition: currentDefinition.trim(),
        slug: createSlug(currentTerm),
        category: determineCategory(currentTerm, currentDefinition),
        meta_description: currentDefinition.substring(0, 150) + '...'
      });
    }
  });
  
  // Segunda passada: adicionar termos relacionados
  terms.forEach(term => {
    term.related_terms = extractRelatedTerms(term.definition, terms);
  });
  
  return terms;
}

// Função principal para popular o banco
async function populateEncyclopedia() {
  try {
    console.log('🌿 Iniciando população da Enciclopédia Canábica...');
    
    // Verificar se existe arquivo da enciclopédia
    const encyclopediaFile = path.join(__dirname, '..', 'Enciclopédia de Termos Canábicos.md');
    
    if (!fs.existsSync(encyclopediaFile)) {
      console.error('❌ Arquivo da enciclopédia não encontrado:', encyclopediaFile);
      console.log('📄 Crie o arquivo "Enciclopédia de Termos Canábicos.md" na raiz do projeto');
      return;
    }
    
    // Processar arquivo
    console.log('📖 Processando arquivo da enciclopédia...');
    const terms = processEncyclopediaFile(encyclopediaFile);
    
    if (terms.length === 0) {
      console.error('❌ Nenhum termo encontrado no arquivo!');
      return;
    }
    
    console.log(`✅ ${terms.length} termos processados`);
    
    // Verificar se a tabela existe
    const { data: tableExists } = await supabase
      .from('encyclopedia_terms')
      .select('id')
      .limit(1);
    
    if (!tableExists) {
      console.error('❌ Tabela encyclopedia_terms não encontrada!');
      console.log('📝 Execute primeiro o script de migração: scripts/migrate-encyclopedia-db.sql');
      return;
    }
    
    // Limpar dados existentes (opcional)
    console.log('🧹 Limpando dados existentes...');
    const { error: deleteError } = await supabase
      .from('encyclopedia_terms')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (deleteError) {
      console.error('❌ Erro ao limpar dados:', deleteError);
      return;
    }
    
    // Inserir novos termos
    console.log('💾 Inserindo termos no banco de dados...');
    
    const { data, error } = await supabase
      .from('encyclopedia_terms')
      .insert(terms)
      .select();
    
    if (error) {
      console.error('❌ Erro ao inserir dados:', error);
      return;
    }
    
    console.log(`✅ ${data.length} termos inseridos com sucesso!`);
    
    // Estatísticas por categoria
    const categoryStats = terms.reduce((acc, term) => {
      acc[term.category] = (acc[term.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📊 Estatísticas por categoria:');
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} termos`);
    });
    
    console.log('\n🎉 Enciclopédia populada com sucesso!');
    console.log('🔗 Acesse: http://localhost:3000/enciclopedia');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  populateEncyclopedia();
}

module.exports = { populateEncyclopedia }; 