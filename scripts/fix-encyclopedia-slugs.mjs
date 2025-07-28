import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Função para normalizar slugs
function normalizeSlug(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

async function main() {
  try {
    console.log('🔍 Verificando slugs na tabela EncyclopediaTerm...');

    const terms = await prisma.encyclopediaTerm.findMany({
      select: {
        id: true,
        term: true,
        slug: true,
      },
    });

    console.log(`📊 Encontrados ${terms.length} termos no banco`);

    const termsToUpdate = [];

    for (const term of terms) {
      const normalizedSlug = normalizeSlug(term.term);
      if (term.slug !== normalizedSlug) {
        termsToUpdate.push({
          id: term.id,
          term: term.term,
          currentSlug: term.slug,
          newSlug: normalizedSlug,
        });
      }
    }

    if (termsToUpdate.length === 0) {
      console.log('✅ Todos os slugs já estão normalizados corretamente!');
      return;
    }

    console.log(`⚠️  Encontrados ${termsToUpdate.length} termos com slugs que precisam ser normalizados:`);
    termsToUpdate.forEach(term => {
      console.log(`   • "${term.term}": "${term.currentSlug}" → "${term.newSlug}"`);
    });

    console.log('\n🔄 Iniciando normalização dos slugs...');
    const correctedSlugs = [];

    for (const term of termsToUpdate) {
      try {
        await prisma.encyclopediaTerm.update({
          where: { id: term.id },
          data: { slug: term.newSlug },
        });
        console.log(`✅ Atualizado: "${term.term}" → "${term.newSlug}"`);
        correctedSlugs.push(term);
      } catch (updateError) {
        console.error(`❌ Erro ao atualizar "${term.term}": ${updateError.message}`);
      }
    }

    console.log(`\n🎉 Normalização concluída! ${correctedSlugs.length} slugs foram atualizados.`);

    if (correctedSlugs.length > 0) {
      const report = {
        timestamp: new Date().toISOString(),
        totalTerms: terms.length,
        updatedTerms: correctedSlugs.length,
        updates: correctedSlugs,
      };
      
      const reportPath = path.join('scripts', 'slug-normalization-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`📋 Relatório salvo em ${reportPath}`);
    }

  } catch (error) {
    console.error('❌ Erro durante a execução:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}); 