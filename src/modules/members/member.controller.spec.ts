import { Test, TestingModule } from "@nestjs/testing";
import { MemberController } from "./member.controller";
import { MemberService } from "./member.service";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

describe("MemberController", () => {
  let app: INestApplication;
  let memberServiceMock: Partial<MemberService>;

  beforeAll(async () => {
    // Mockando o serviço
    memberServiceMock = {
      create: jest.fn().mockResolvedValue(undefined),
      findAll: jest.fn().mockResolvedValue(undefined),
      findOne: jest.fn().mockResolvedValue(undefined),
      update: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    // Criando o módulo de teste
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [{ provide: MemberService, useValue: memberServiceMock }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("createMember", () => {
    it("deveria criar um membro", async () => {
      const dto = { name: "name", communityLevel: "basic" };
      await request(app.getHttpServer()).post("/members").send(dto).expect(201);
    });
  });

  describe("findAll", () => {
    it("deveria retornar todos os membros", async () => {
      await request(app.getHttpServer()).get("/members/find-all").expect(200);
    });
  });

  describe("findOne", () => {
    it("deveria retornar um membro pelo ID", async () => {
      await request(app.getHttpServer())
        .get("/members/12345")
        .expect(200);
    });
  });

  describe("update", () => {
    it("deveria atualizar um membro", async () => {
      const updates = { name: "updated name" };
      await request(app.getHttpServer())
        .patch("/members/12345")
        .send(updates)
        .expect(200);
    });
  });

  describe("delete", () => {
    it("deveria deletar um membro", async () => {
      await request(app.getHttpServer())
        .delete("/members/12345")
        .expect(204);
    });
  });
});
