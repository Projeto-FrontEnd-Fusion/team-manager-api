import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createHardSkills() {
  try {
    const hardSkillsCount = await prisma.hardSkills.count();
    if (hardSkillsCount === 0) {
      await prisma.hardSkills.createMany({
        data: [
          {
            id: '1',
            name: 'Typescript',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Javascript',
            createdAt: new Date().toISOString(),
          },
          {
            id: '3',
            name: 'Python',
            createdAt: new Date().toISOString(),
          },
          {
            id: '4',
            name: 'C#',
            createdAt: new Date().toISOString(),
          },
          {
            id: '5',
            name: 'Ruby',
            createdAt: new Date().toISOString(),
          },
        ],
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function createSoftSkills() {
  try {
    const softSkillsCount = await prisma.softSkills.count();
    if (softSkillsCount === 0) {
      await prisma.softSkills.createMany({
        data: [
          {
            id: '1',
            name: 'Comunicação e escuta ativa',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Inteligência Emocional',
            createdAt: new Date().toISOString(),
          },
          {
            id: '3',
            name: 'Orientação a resultados',
            createdAt: new Date().toISOString(),
          },
          {
            id: '4',
            name: 'Resiliência',
            createdAt: new Date().toISOString(),
          },
          {
            id: '5',
            name: 'Agilidade',
            createdAt: new Date().toISOString(),
          },
          {
            id: '6',
            name: 'Pensamento crítico',
            createdAt: new Date().toISOString(),
          },
          {
            id: '7',
            name: 'Tomada de decisões',
            createdAt: new Date().toISOString(),
          },
          {
            id: '8',
            name: 'Negociação',
            createdAt: new Date().toISOString(),
          },
          {
            id: '9',
            name: 'Flexibilidade',
            createdAt: new Date().toISOString(),
          },
          {
            id: '10',
            name: 'Criatividade',
            createdAt: new Date().toISOString(),
          },
        ],
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  await createHardSkills();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
