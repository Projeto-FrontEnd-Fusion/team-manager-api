import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { CreateMemberDto } from './dto/CreateMember.dto';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { UpdateCreateMemberDto } from './dto/UpdateMember.dto';

describe('MemberController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MemberController],
      providers: [MemberService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/members (POST)', async () => {
    const createMemberDto: CreateMemberDto = {
      name: 'John Doe',
      profileImage: '',
      stack: 'Full Stack',
      communityLevel: 'Senior',
      currentSquad: 'Eagles',
      skills: ['Java', 'JavaScript'],
      softSkills: ['Comunicativo', 'Atencioso', 'Prestativo'],
      professionalProfile: [
        {
          id: '1',
          platform: 'linkedin',
          url: 'https://linkedin.com/seunome',
          memberId: '1', // O TypeORM associará o `member` automaticamente
          createdAt: new Date().toISOString(),
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/members')
      .send(createMemberDto)
      .expect(201);

    expect(response.body).toMatchObject(createMemberDto);
  });

  it('/members (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/members').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/members/:memberId (GET)', async () => {
    const memberId = 'some-member-id'; // substitua por um ID válido

    const response = await request(app.getHttpServer())
      .get(`/members/${memberId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', memberId);
  });

  it('/members/:id (PATCH)', async () => {
    const memberId = 'some-member-id'; // substitua por um ID válido
    const updateMemberDto: UpdateCreateMemberDto = {
      name: 'Jane Doe',
      // outros campos necessários
    };

    const response = await request(app.getHttpServer())
      .patch(`/members/${memberId}`)
      .send(updateMemberDto)
      .expect(200);

    expect(response.body).toMatchObject(updateMemberDto);
  });

  it('/members/:id (DELETE)', async () => {
    const memberId = 'some-member-id'; // substitua por um ID válido

    await request(app.getHttpServer()).delete(`/members/${memberId}`).expect(200);
  });
});
