-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "community_level" TEXT NOT NULL,
    "current_squad" TEXT,
    "profileImageUrl" TEXT,
    "createdAt" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professional_profile" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "member_id" TEXT,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "professional_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cover" TEXT,
    "description" TEXT NOT NULL,
    "technologies" TEXT[],
    "url" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hard_skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "hard_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soft_skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "soft_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hard_skills_members" (
    "memberId" TEXT NOT NULL,
    "hardSkillId" TEXT NOT NULL,

    CONSTRAINT "hard_skills_members_pkey" PRIMARY KEY ("memberId","hardSkillId")
);

-- CreateTable
CREATE TABLE "soft_skills_members" (
    "memberId" TEXT NOT NULL,
    "softSkillId" TEXT NOT NULL,

    CONSTRAINT "soft_skills_members_pkey" PRIMARY KEY ("memberId","softSkillId")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemberToProjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MemberToProjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_uq" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_uq" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "member_id_uq" ON "members"("id");

-- CreateIndex
CREATE UNIQUE INDEX "members_userId_key" ON "members"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "professional_profile_id_uq" ON "professional_profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "professional_profile_url_uq" ON "professional_profile"("url");

-- CreateIndex
CREATE UNIQUE INDEX "project_id_uq" ON "projects"("id");

-- CreateIndex
CREATE UNIQUE INDEX "hard_skills_id_uq" ON "hard_skills"("id");

-- CreateIndex
CREATE UNIQUE INDEX "hard_skills_name_key" ON "hard_skills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "soft_skills_name_key" ON "soft_skills"("name");

-- CreateIndex
CREATE INDEX "_MemberToProjects_B_index" ON "_MemberToProjects"("B");

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional_profile" ADD CONSTRAINT "professional_profile_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hard_skills_members" ADD CONSTRAINT "hard_skills_members_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hard_skills_members" ADD CONSTRAINT "hard_skills_members_hardSkillId_fkey" FOREIGN KEY ("hardSkillId") REFERENCES "hard_skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soft_skills_members" ADD CONSTRAINT "soft_skills_members_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soft_skills_members" ADD CONSTRAINT "soft_skills_members_softSkillId_fkey" FOREIGN KEY ("softSkillId") REFERENCES "soft_skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToProjects" ADD CONSTRAINT "_MemberToProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToProjects" ADD CONSTRAINT "_MemberToProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
