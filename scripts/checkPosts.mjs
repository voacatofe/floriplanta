import { PrismaClient } from '../lib/generated/prisma/index.js';

const prisma = new PrismaClient();

async function checkPosts() {
  try {
    console.log('🔍 Verificando posts no banco de dados...');
    
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { name: true, email: true }
        },
        categories: true,
        tags: true
      }
    });
    
    console.log(`📊 Total de posts encontrados: ${posts.length}`);
    
    if (posts.length > 0) {
      console.log('\n📝 Posts encontrados:');
      posts.forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.title}`);
        console.log(`   - Slug: ${post.slug}`);
        console.log(`   - Publicado: ${post.published ? 'Sim' : 'Não'}`);
        console.log(`   - Autor: ${post.author?.name} (${post.author?.email})`);
        console.log(`   - Categorias: ${post.categories.map(c => c.name).join(', ')}`);
        console.log(`   - Tags: ${post.tags.map(t => t.name).join(', ')}`);
        console.log(`   - Criado em: ${post.createdAt}`);
      });
    } else {
      console.log('❌ Nenhum post encontrado no banco de dados.');
    }
    
    // Verificar também categorias e tags
    const categories = await prisma.category.findMany();
    const tags = await prisma.tag.findMany();
    
    console.log(`\n📂 Total de categorias: ${categories.length}`);
    console.log(`🏷️  Total de tags: ${tags.length}`);
    
  } catch (error) {
    console.error('❌ Erro ao verificar posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPosts();