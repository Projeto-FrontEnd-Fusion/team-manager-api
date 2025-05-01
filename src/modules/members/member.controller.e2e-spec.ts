import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Test } from '@nestjs/testing';

import { CreateMemberDto } from './dto/CreateMember.dto';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

import { PrismaModule } from '@infra/database/prisma/helpers/prisma.module';

describe('MemberController (e2e)', () => {
  let app: INestApplication;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [MemberController],
      providers: [MemberService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 30000);

  afterAll(async () => {
    await app.close();
    await prismaClient.$disconnect();
  }, 30000);

  it('/members (POST)', async () => {
    const createMemberDto: CreateMemberDto = {
      name: 'John Doe',
      profileImage: '',
      stack: 'Full Stack',
      communityLevel: 'Senior',
      currentSquad: 'Eagles',
      hardSkills: ['Java', 'JavaScript'],
      softSkills: [],
      professionalProfiles: [
        {
          platform: 'linkedin',
          url: 'https://linkedin.com/seunome',
        },
      ],
      projects: [],
    };

    const response = await request(app.getHttpServer())
      .post('/members')
      .send(createMemberDto)
      .expect(HttpStatus.CREATED);

    expect(response.body).toMatchObject(createMemberDto);
  });

  it('/members (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/members')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  // it('/members/:memberId (GET)', async () => {
  //   const memberId = 'some-member-id'; // substitua por um ID válido

  //   const response = await request(app.getHttpServer())
  //     .get(`/members/${memberId}`)
  //     .expect(200);

  //   expect(response.body).toHaveProperty('id', memberId);
  // });

  // it('/members/:id (PATCH)', async () => {
  //   const memberId = 'some-member-id'; // substitua por um ID válido
  //   const updateMemberDto: UpdateMemberDto = {
  //     name: 'Jane Doe',
  //     // outros campos necessários
  //   };

  //   const response = await request(app.getHttpServer())
  //     .patch(`/members/${memberId}`)
  //     .send(updateMemberDto)
  //     .expect(200);

  //   expect(response.body).toMatchObject(updateMemberDto);
  // });

  // it('/members/:id (DELETE)', async () => {
  //   const memberId = 'some-member-id'; // substitua por um ID válido

  //   await request(app.getHttpServer()).delete(`/members/${memberId}`).expect(200);
  // });
});
