// Teste da função getPosts após correções
import { PrismaClient } from '../lib/generated/prisma/index.js';

const prisma = new PrismaClient();
const POSTS_PER_PAGE = 10; // Valor da constante

// Simular a função getPosts
async function getPosts(options = {}) {
  const { page = 1, categorySlug, searchQuery, published = true } = options;

  const whereClause = {};
  
  if (published !== 'all') {
    whereClause.published = published;
  }
  
  if (categorySlug) {
    whereClause.categories = {
      some: {
        slug: categorySlug,
      },
    };
  }
  
  if (searchQuery) {
    whereClause.OR = [
      {
        title: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
      {
        content: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
    ];
  }

  console.log('🔍 WhereClause:', JSON.stringify(whereClause, null, 2));

  const [posts, totalCount] = await prisma.$transaction([
    prisma.post.findMany({
      where: whereClause,
      include: {
        author: {
          select: { name: true },
        },
        categories: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    prisma.post.count({ where: whereClause }),
  ]);

  return { posts, totalCount };
}

async function testGetPosts() {
  try {
    console.log('🧪 Testando função getPosts...');
    
    // Teste 1: Buscar todos os posts (como no admin)
    console.log('\n📋 Teste 1: Buscar todos os posts (published: "all")');
    const result1 = await getPosts({ published: 'all' });
    console.log(`✅ Resultado: ${result1.posts.length} posts de ${result1.totalCount} total`);
    
    if (result1.posts.length > 0) {
      console.log('📝 Primeiros 3 posts:');
      result1.posts.slice(0, 3).forEach((post, index) => {
        console.log(`   ${index + 1}. ${post.title} (published: ${post.published})`);
      });
    }
    
    // Teste 2: Buscar apenas posts publicados
    console.log('\n📋 Teste 2: Buscar apenas posts publicados (published: true)');
    const result2 = await getPosts({ published: true });
    console.log(`✅ Resultado: ${result2.posts.length} posts de ${result2.totalCount} total`);
    
    // Teste 3: Buscar apenas rascunhos
    console.log('\n📋 Teste 3: Buscar apenas rascunhos (published: false)');
    const result3 = await getPosts({ published: false });
    console.log(`✅ Resultado: ${result3.posts.length} posts de ${result3.totalCount} total`);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testGetPosts();