import { PrismaClient } from '@/lib/generated/prisma';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@floriplanta.com.br'; // <-- MUDE AQUI PARA O SEU EMAIL
  const adminPassword = 'admin'; // <-- MUDE AQUI PARA UMA SENHA FORTE

  console.log('Iniciando o seeding do usuário admin...');

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('O usuário admin já existe. Nada a fazer.');
    return;
  }

  const hashedPassword = await hash(adminPassword, 12);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Administrador',
    },
  });

  console.log('Usuário admin criado com sucesso:');
  console.log(admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 