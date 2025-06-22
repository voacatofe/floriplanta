import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Função para normalizar slugs (mesma que criamos no encyclopedia.ts)
function normalizeSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '-')     // Substitui caracteres especiais por hífen
    .replace(/^-+|-+$/g, '')         // Remove hífens do início e fim
    .replace(/-+/g, '-');            // Substitui múltiplos hífens por um só
}

async function main() {
  // Configurar cliente Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Chave de serviço para operações administrativas
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Erro: Variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são necessárias');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log('🔍 Verificando slugs na tabela encyclopedia_terms...');
    
    // Buscar todos os termos
    const { data: terms, error } = await supabase
      .from('encyclopedia_terms')
      .select('id, term, slug');
    
    if (error) {
      throw error;
    }

    console.log(`📊 Encontrados ${terms.length} termos no banco`);
    
    let termsToUpdate = [];
    let correctedSlugs = [];

    // Verificar cada termo
    for (const term of terms) {
      const normalizedSlug = normalizeSlug(term.term);
      
      if (term.slug !== normalizedSlug) {
        termsToUpdate.push({
          id: term.id,
          term: term.term,
          currentSlug: term.slug,
          newSlug: normalizedSlug
        });
      }
    }

    if (termsToUpdate.length === 0) {
      console.log('✅ Todos os slugs já estão normalizados corretamente!');
      return;
    }

    console.log(`⚠️  Encontrados ${termsToUpdate.length} termos com slugs que precisam ser normalizados:`);
    
    // Mostrar os termos que serão atualizados
    termsToUpdate.forEach(term => {
      console.log(`   • "${term.term}": "${term.currentSlug}" → "${term.newSlug}"`);
    });

    // Confirmar atualização
    console.log('\n🔄 Iniciando normalização dos slugs...');
    
    // Atualizar os slugs no banco
    for (const term of termsToUpdate) {
      const { error: updateError } = await supabase
        .from('encyclopedia_terms')
        .update({ slug: term.newSlug })
        .eq('id', term.id);

      if (updateError) {
        console.error(`❌ Erro ao atualizar "${term.term}": ${updateError.message}`);
      } else {
        console.log(`✅ Atualizado: "${term.term}" → "${term.newSlug}"`);
        correctedSlugs.push(term);
      }
    }

    console.log(`\n🎉 Normalização concluída! ${correctedSlugs.length} slugs foram atualizados.`);
    
    // Salvar relatório
    const report = {
      timestamp: new Date().toISOString(),
      totalTerms: terms.length,
      updatedTerms: correctedSlugs.length,
      updates: correctedSlugs
    };
    
    fs.writeFileSync('scripts/slug-normalization-report.json', JSON.stringify(report, null, 2));
    console.log('📋 Relatório salvo em scripts/slug-normalization-report.json');

  } catch (error) {
    console.error('❌ Erro durante a execução:', error);
    process.exit(1);
  }
}

// Executar o script
main().catch(console.error); 