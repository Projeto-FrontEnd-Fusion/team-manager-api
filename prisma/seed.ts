import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createHardSkills() {
  try {
    const data = [
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
    ]
    const hardSkill = await prisma.hardSkills.findMany({
      select: {
        name: true
      }
    })
    const notIncluded = data.filter(({ name }) => !hardSkill.includes({ name }));
    await prisma.hardSkills.createMany({
      data: notIncluded
    })
  } catch (err) {
    console.log(err);
  }
}

async function createSoftSkills() {
  const data = [
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
  ]
  try {
    const softSkills = await prisma.softSkills.findMany({
      select: {
        name: true
      }
    })
    const notIncluded = data.filter(({ name }) => !softSkills.includes({ name }));
    await prisma.softSkills.createMany({
      data: notIncluded
    })
  } catch (err) {
    console.log(err);
  }
}

async function createUsers() {
  const data = [
    {
      id: '1',
      email: 'pedro_teste@teste.com',
      password: bcrypt.hashSync('senha_teste', 2),
      createdAt: new Date().toISOString(),
      role: 'user',
    },
    {
      id: '2',
      email: 'joao_teste@teste.com',
      password: bcrypt.hashSync('senha_teste', 2),
      createdAt: new Date().toISOString(),
      role: 'user',
    }
  ]

  try {
    const users = await prisma.user.findMany({
      select: { email: true }
    })
    const notIncluded = data.filter(({ email }) => !users.includes({ email }));

    await prisma.user.createMany({
      data: notIncluded
    })
  } catch (err) {
    console.log(err);
  }
}

async function createMembers() {
  const data = [
    {
      id: '1',
      userId: '1',
      birthDate: '10/10/2025',
      communityLevel: 'Senior',
      name: 'Pedro',
      stack: 'Senior',
      currentSquad: 'Dragons',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      userId: '2',
      birthDate: '10/10/2025',
      communityLevel: 'Senior',
      name: 'Joao',
      stack: 'Junior',
      currentSquad: 'Vingadores',
      createdAt: new Date().toISOString()
    }
  ]

  try {
    const members = await prisma.member.findMany({
      select: { userId: true }
    })
    const notIncluded = data.filter(({ userId }) => !members.includes({ userId }))

    await prisma.member.createMany({
      data: notIncluded
    })
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  await createHardSkills();
  await createSoftSkills();
  await createUsers();
  await createMembers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
