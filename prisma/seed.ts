import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const skillsCount = await prisma.skills.count();
    if (skillsCount === 0) {
      await prisma.skills.createMany({
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
        ]
      })
    }
  } catch (err) {
    console.log(err);
  }
}