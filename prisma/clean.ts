import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanDatabase() {
  await prisma.hardSkills.deleteMany();
  await prisma.softSkills.deleteMany();
  await prisma.member.deleteMany();
  await prisma.logs.deleteMany();
  await prisma.user.deleteMany();
  await prisma.member.deleteMany();
  await prisma.hardSkillsMembers.deleteMany();
  await prisma.softSkillsMembers.deleteMany();
  await prisma.professionalProfile.deleteMany();
  await prisma.projects.deleteMany();
}

async function main() {
  await cleanDatabase();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })