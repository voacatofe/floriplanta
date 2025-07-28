import { PrismaClient } from '../lib/generated/prisma/index.js';

const prisma = new PrismaClient();

async function debugPosts() {
  try {
    console.log('🔍 Debug: Testando função getPosts...');
    
    // Simular a mesma consulta que a função getPosts faz
    const whereClause = {}; // status: 'all' não adiciona filtro
    
    console.log('📊 Executando consulta com whereClause:', JSON.stringify(whereClause, null, 2));
    
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
        skip: 0, // página 1
        take: 10, // POSTS_PER_PAGE
      }),
      prisma.post.count({ where: whereClause }),
    ]);
    
    console.log(`✅ Resultado da consulta:`);
    console.log(`   - Total de posts: ${totalCount}`);
    console.log(`   - Posts retornados: ${posts.length}`);
    
    if (posts.length > 0) {
      console.log('\n📝 Primeiros posts:');
      posts.slice(0, 3).forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.title}`);
        console.log(`   - ID: ${post.id}`);
        console.log(`   - Slug: ${post.slug}`);
        console.log(`   - Published: ${post.published}`);
        console.log(`   - Status: ${post.status || 'N/A'}`);
        console.log(`   - Autor: ${post.author?.name || 'N/A'}`);
        console.log(`   - Categorias: ${post.categories?.length || 0}`);
        console.log(`   - Tags: ${post.tags?.length || 0}`);
      });
    }
    
    // Testar também com filtro published
    console.log('\n🔍 Testando com filtro published=true...');
    const publishedPosts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: { select: { name: true } },
        categories: true,
        tags: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    console.log(`📊 Posts publicados: ${publishedPosts.length}`);
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
    console.error('Stack trace:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

debugPosts();