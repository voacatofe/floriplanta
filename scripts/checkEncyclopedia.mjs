import { PrismaClient } from '../lib/generated/prisma/index.js';

const prisma = new PrismaClient();

async function checkEncyclopedia() {
  try {
    console.log('🔍 Verificando dados da enciclopédia...');

    // Contar total de termos
    const totalTerms = await prisma.encyclopediaTerm.count();
    console.log(`📊 Total de termos inseridos: ${totalTerms}`);

    // Contar por categoria
    const categories = await prisma.encyclopediaTerm.groupBy({
      by: ['category'],
      _count: {
        category: true
      }
    });

    console.log('\n📋 Termos por categoria:');
    categories.forEach(cat => {
      console.log(`  ${cat.category}: ${cat._count.category} termos`);
    });

    // Mostrar alguns exemplos
    const sampleTerms = await prisma.encyclopediaTerm.findMany({
      take: 5,
      select: {
        term: true,
        category: true,
        slug: true
      }
    });

    console.log('\n🔤 Exemplos de termos inseridos:');
    sampleTerms.forEach(term => {
      console.log(`  - ${term.term} (${term.category}) - slug: ${term.slug}`);
    });

  } catch (error) {
    console.error('❌ Erro ao verificar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkEncyclopedia();