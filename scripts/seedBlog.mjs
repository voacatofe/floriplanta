import { PrismaClient } from '../lib/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding do blog...');

  // Verificar se já existe um usuário admin
  const adminUser = await prisma.user.findFirst({
    where: { email: 'admin@floriplanta.com.br' }
  });

  if (!adminUser) {
    console.log('Usuário admin não encontrado. Execute primeiro o seedAdmin.mjs');
    return;
  }

  // Criar categorias
  const categories = [
    { name: 'Notícias da Floriplanta', slug: 'noticias-floriplanta' },
    { name: 'Cannabis Medicinal', slug: 'cannabis-medicinal' },
    { name: 'Pesquisas e Estudos', slug: 'pesquisas-estudos' },
    { name: 'Saúde e Bem-estar', slug: 'saude-bem-estar' },
    { name: 'Legislação', slug: 'legislacao' },
    { name: 'Comunidade', slug: 'comunidade' },
    { name: 'Eventos', slug: 'eventos' }
  ];

  console.log('Criando categorias...');
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
  }

  // Criar tags
  const tags = [
    { name: 'CBD', slug: 'cbd' },
    { name: 'THC', slug: 'thc' },
    { name: 'Epilepsia', slug: 'epilepsia' },
    { name: 'Dor Crônica', slug: 'dor-cronica' },
    { name: 'Ansiedade', slug: 'ansiedade' },
    { name: 'Depressão', slug: 'depressao' },
    { name: 'Autismo', slug: 'autismo' },
    { name: 'Parkinson', slug: 'parkinson' },
    { name: 'Alzheimer', slug: 'alzheimer' },
    { name: 'Câncer', slug: 'cancer' },
    { name: 'Fibromialgia', slug: 'fibromialgia' },
    { name: 'ANVISA', slug: 'anvisa' },
    { name: 'Prescrição Médica', slug: 'prescricao-medica' },
    { name: 'Cultivo', slug: 'cultivo' },
    { name: 'Óleo de Cannabis', slug: 'oleo-cannabis' }
  ];

  console.log('Criando tags...');
  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag
    });
  }

  // Buscar categorias e tags criadas
  const createdCategories = await prisma.category.findMany();
  const createdTags = await prisma.tag.findMany();

  // Criar posts de exemplo
  const posts = [
    {
      title: 'Bem-vindos ao Blog da Floriplanta!',
      slug: 'bem-vindos-ao-blog',
      content: `# Bem-vindos ao Blog da Floriplanta!

É com grande alegria que inauguramos nosso novo espaço de conhecimento e troca. Aqui você encontrará artigos, notícias, pesquisas e histórias sobre o universo da cannabis medicinal.

## Nossa Missão

Nosso objetivo é democratizar o acesso à informação sobre cannabis medicinal, sempre baseada em evidências científicas e experiências reais de nossa comunidade.

## O que você encontrará aqui:

- **Notícias atualizadas** sobre legislação e regulamentação
- **Pesquisas científicas** traduzidas e explicadas de forma acessível
- **Histórias de pacientes** e suas jornadas de tratamento
- **Guias práticos** sobre como acessar tratamentos
- **Eventos e webinars** da nossa comunidade

## Participe!

Este é um espaço de todos nós. Compartilhe suas experiências, tire suas dúvidas e ajude a construir uma comunidade mais informada e unida.

Juntos, somos mais fortes! 💚`,
      imageUrl: '/images/blog/bem-vindos-blog.svg',
      published: true,
      categories: ['noticias-floriplanta'],
      tags: ['comunidade']
    },
    {
      title: 'Cannabis Medicinal: O que a Ciência Diz',
      slug: 'cannabis-medicinal-ciencia',
      content: `# Cannabis Medicinal: O que a Ciência Diz

A cannabis medicinal tem ganhado cada vez mais reconhecimento científico. Neste artigo, exploramos as principais evidências científicas sobre seus benefícios terapêuticos.

## Componentes Ativos

### CBD (Canabidiol)
O CBD é um dos principais compostos da cannabis, conhecido por suas propriedades:
- Anti-inflamatórias
- Anticonvulsivantes
- Ansiolíticas
- Neuroprotetoras

### THC (Tetrahidrocanabinol)
O THC possui propriedades:
- Analgésicas
- Antieméticas
- Estimulantes do apetite
- Relaxantes musculares

## Condições Tratadas

Estudos científicos demonstram eficácia no tratamento de:

1. **Epilepsia refratária**
2. **Dor crônica**
3. **Espasticidade na esclerose múltipla**
4. **Náuseas e vômitos em quimioterapia**
5. **Transtornos de ansiedade**

## Conclusão

A evidência científica continua crescendo, mostrando o potencial terapêutico da cannabis medicinal para diversas condições.`,
      imageUrl: '/images/blog/cannabis-ciencia.svg',
      published: true,
      categories: ['cannabis-medicinal', 'pesquisas-estudos'],
      tags: ['cbd', 'thc', 'pesquisa']
    },
    {
      title: 'Guia Completo: Como Acessar Cannabis Medicinal no Brasil',
      slug: 'guia-acesso-cannabis-medicinal-brasil',
      content: `# Guia Completo: Como Acessar Cannabis Medicinal no Brasil

Navegar pelo processo de acesso à cannabis medicinal pode parecer complexo. Este guia simplifica todos os passos necessários.

## Passo 1: Consulta Médica

- Procure um médico especialista na sua condição
- Discuta todas as opções de tratamento
- Solicite a prescrição médica específica

## Passo 2: Documentação Necessária

### Para a ANVISA:
- Receita médica em duas vias
- Relatório médico detalhado
- Exames que comprovem a condição
- Termo de responsabilidade

## Passo 3: Solicitação na ANVISA

1. Acesse o portal da ANVISA
2. Preencha o formulário online
3. Anexe toda a documentação
4. Pague a taxa (quando aplicável)
5. Aguarde a análise (até 10 dias úteis)

## Passo 4: Importação ou Compra

### Produtos Importados:
- Autorização de importação
- Compra em farmácias autorizadas no exterior
- Declaração na Receita Federal

### Produtos Nacionais:
- Compra em farmácias autorizadas
- Apresentação da autorização ANVISA

## Dicas Importantes

- Mantenha sempre a documentação em dia
- Renove as autorizações antes do vencimento
- Guarde todos os comprovantes
- Mantenha contato regular com seu médico

## Apoio da Floriplanta

Nossa associação oferece:
- Orientação jurídica
- Suporte no processo
- Rede de médicos parceiros
- Comunidade de apoio

Lembre-se: você não está sozinho nesta jornada!`,
      imageUrl: '/images/blog/guia-acesso-cannabis.svg',
      published: true,
      categories: ['legislacao', 'comunidade'],
      tags: ['anvisa', 'prescricao-medica', 'guia']
    },
    {
      title: 'Histórias Reais: Como a Cannabis Mudou Minha Vida',
      slug: 'historias-reais-cannabis-mudou-vida',
      content: `# Histórias Reais: Como a Cannabis Mudou Minha Vida

*Depoimento de Maria Silva, mãe de João, 8 anos, diagnosticado com epilepsia refratária*

## O Início da Jornada

Quando João tinha 3 anos, começaram as crises epilépticas. Eram mais de 100 crises por dia. Nenhum medicamento tradicional funcionava.

## A Descoberta

Foi através de um grupo de mães que conheci a cannabis medicinal. No início, tinha muito medo e preconceito.

## O Primeiro Tratamento

Com a prescrição médica e autorização da ANVISA, começamos com óleo de CBD. Os resultados foram:

- **Primeira semana**: Redução de 30% nas crises
- **Primeiro mês**: Redução de 70% nas crises
- **Terceiro mês**: João teve apenas 2 crises

## Mudanças na Qualidade de Vida

### Para João:
- Voltou a brincar
- Melhorou na escola
- Recuperou o sorriso
- Dorme melhor

### Para a Família:
- Menos ansiedade
- Noites de sono
- Esperança renovada
- Vida social retomada

## Desafios Enfrentados

- Preconceito de familiares
- Dificuldades burocráticas
- Custo do tratamento
- Falta de informação médica

## O Apoio da Comunidade

A Floriplanta foi fundamental:
- Orientação jurídica
- Suporte emocional
- Rede de contatos
- Informações atualizadas

## Mensagem de Esperança

"Se você está passando por algo similar, não desista. A cannabis medicinal pode ser a resposta que você procura. Busque informação, encontre médicos especializados e conte com o apoio da nossa comunidade."

---

*Esta é uma das muitas histórias de transformação em nossa comunidade. Se você tem uma história para compartilhar, entre em contato conosco.*`,
      imageUrl: '/images/blog/historias-reais.svg',
      published: true,
      categories: ['comunidade', 'saude-bem-estar'],
      tags: ['epilepsia', 'cbd', 'historias-reais', 'criancas']
    },
    {
      title: 'Novidades na Legislação: RDC 570/2023 da ANVISA',
      slug: 'novidades-legislacao-rdc-570-2023',
      content: `# Novidades na Legislação: RDC 570/2023 da ANVISA

A ANVISA publicou a RDC 570/2023, trazendo importantes atualizações para o acesso à cannabis medicinal no Brasil.

## Principais Mudanças

### 1. Simplificação do Processo
- Redução de documentos necessários
- Processo mais ágil
- Menos burocracia

### 2. Novos Produtos Autorizados
- Ampliação da lista de produtos
- Novas concentrações disponíveis
- Diferentes formas farmacêuticas

### 3. Prescrição Médica
- Qualquer médico pode prescrever
- Não precisa mais ser especialista
- Receita simples para alguns casos

## Impactos Positivos

### Para Pacientes:
- Acesso mais rápido
- Menor custo burocrático
- Mais opções de tratamento

### Para Médicos:
- Processo mais simples
- Menos responsabilidade burocrática
- Foco no tratamento

### Para Famílias:
- Menos stress
- Economia de tempo
- Maior segurança jurídica

## O que Muda na Prática

### Antes da RDC 570/2023:
1. Consulta com especialista obrigatória
2. Relatório médico extenso
3. Múltiplos exames
4. Processo demorado (até 30 dias)

### Depois da RDC 570/2023:
1. Qualquer médico pode prescrever
2. Relatório simplificado
3. Exames essenciais apenas
4. Processo mais rápido (até 10 dias)

## Próximos Passos

A ANVISA continua trabalhando em:
- Regulamentação do cultivo
- Ampliação de produtos nacionais
- Redução de custos
- Educação médica

## Como a Floriplanta Pode Ajudar

Nossa associação oferece:
- Orientação sobre as novas regras
- Suporte jurídico atualizado
- Rede de médicos capacitados
- Acompanhamento do processo

## Conclusão

A RDC 570/2023 representa um grande avanço para o acesso à cannabis medicinal no Brasil. Estamos caminhando para um futuro mais acessível e humanizado.

*Mantenha-se informado através do nosso blog e redes sociais para não perder nenhuma atualização importante.*`,
      imageUrl: '/images/blog/legislacao-rdc-570.svg',
      published: true,
      categories: ['legislacao', 'noticias-floriplanta'],
      tags: ['anvisa', 'rdc-570', 'legislacao', 'acesso']
    }
  ];

  console.log('Criando posts...');
  for (const postData of posts) {
    const { categories: categoryNames, tags: tagNames, ...post } = postData;
    
    // Verificar se o post já existe
    const existingPost = await prisma.post.findUnique({
      where: { slug: post.slug }
    });

    if (existingPost) {
      console.log(`Post '${post.title}' já existe, pulando...`);
      continue;
    }

    // Encontrar categorias e tags
    const postCategories = createdCategories.filter(cat => 
      categoryNames.includes(cat.slug)
    );
    const postTags = createdTags.filter(tag => 
      tagNames.includes(tag.slug)
    );

    await prisma.post.create({
      data: {
        ...post,
        authorId: adminUser.id,
        categories: {
          connect: postCategories.map(cat => ({ id: cat.id }))
        },
        tags: {
          connect: postTags.map(tag => ({ id: tag.id }))
        }
      }
    });

    console.log(`Post '${post.title}' criado com sucesso!`);
  }

  console.log('Seeding do blog concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });