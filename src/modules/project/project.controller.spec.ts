import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule } from '@infra/database/prisma/helpers/prisma.module';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { right } from '@utils/either';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [ProjectController],
      providers: [
        ProjectService,
        {
          provide: PrismaService,
          useValue: {
            projects: {
              create: jest.fn(),
              findFirst: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a project', async () => {
      const project = {
        name: 'Team Manager API - Vingadores',
        description: 'Descrição',
        url: 'www.google.com',
        cover: 'www.google.com',
        technologies: ['NodeJs'],
        members: [],
      };
      jest.spyOn(service, 'create').mockResolvedValue(
        right({
          id: '1',
          createdAt: new Date().toISOString(),
          ...project,
        }));

      const response = await controller.createProject(project);

      expect(response).toBeDefined();
      expect(service.create).toHaveBeenCalled();
      expect(response.data.name).toBe('Team Manager API - Vingadores');
    });
  });

  describe('findMany', () => {
    it('should return all projects', async () => {
      const projects = [
        {
          id: '1',
          name: 'Team Manager API - Vingadores',
          description: 'Descrição',
          url: 'www.google.com',
          cover: 'www.google.com',
          technologies: ['NodeJs'],
          createdAt: new Date().toISOString(),
          members: [],
        },
      ];
      jest.spyOn(service, 'findMany').mockResolvedValue(right(projects));

      const response = await controller.findManyProjects();

      expect(response).toEqual(projects);
      expect(service.findMany).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a project by id', async () => {
      const project = {
        id: '1',
        name: 'Team Manager API - Vingadores',
        description: 'Descrição',
        url: 'www.google.com',
        cover: 'www.google.com',
        technologies: ['NodeJs'],
        createdAt: new Date().toISOString(),
      };
      jest.spyOn(service, 'findById').mockResolvedValue(right(project));

      const response = await controller.findProjectById('1');

      expect(response).toEqual(project);
      expect(service.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('deleteById', () => {
    it('should delete a project by id', async () => {
      const project = {
        id: '1',
        name: 'Frontend Fusion',
        cover: 'image.jpg',
        technologies: 'NodeJs',
        description: '',
        url: '',
        createdAt: new Date().toISOString(),
      };
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);

      await controller.deleteProjectById('1');

      expect(service.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('updateProject', () => {
    it('should update a project', async () => {
      const project = {
        id: '1',
        name: 'Team Manager API - Vingadores',
        description: 'Descrição',
        url: 'www.google.com',
        cover: 'www.google.com',
        technologies: ['NodeJs'],
        createdAt: new Date().toISOString(),
      };
      const payload = {
        name: 'Frontend Fusion',
      };
      jest
        .spyOn(service, 'updateProject')
        .mockResolvedValue(right({ ...project, ...payload }));

      const response = await controller.updateProject('1', payload);

      expect(response.data.name).toEqual('Frontend Fusion');
      expect(service.updateProject).toHaveBeenCalledWith('1', payload);
    });
  });
});
