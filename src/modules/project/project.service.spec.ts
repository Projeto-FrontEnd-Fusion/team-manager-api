import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateProjectDto } from './dto/CreateProject.dto';
import { PrismaModule } from '@infra/database/prisma/helpers/prisma.module';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { ProjectService } from './project.service';
import { deleteFile } from '@modules/shared/deleteFiles';

jest.mock('@modules/shared/deleteFiles');

describe('ProjectService', () => {
  let projectService: ProjectService;
  let prismaService: PrismaService;
  let newProject: CreateProjectDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ProjectService],
    }).compile();

    projectService = module.get<ProjectService>(ProjectService);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.spyOn(prismaService.projects, 'create').mockImplementation(jest.fn());
    jest
      .spyOn(prismaService.projects, 'findFirst')
      .mockImplementation(jest.fn());
    jest
      .spyOn(prismaService.projects, 'findMany')
      .mockImplementation(jest.fn());
    jest.spyOn(prismaService.projects, 'delete').mockImplementation(jest.fn());
    jest.spyOn(prismaService.projects, 'update').mockImplementation(jest.fn());

    newProject = {
      name: 'Team Manager API - Vingadores',
      url: '',
      description: '',
      cover: '',
      technologies: ['NodeJs'],
    };
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of projects', async () => {
      const projects = [
        {
          id: '1',
          createdAt: new Date().toISOString(),
          cover: '',
          technologies: ['NodeJs'],
          ...newProject,
        },
      ];

      jest
        .spyOn(prismaService.projects, 'findMany')
        .mockResolvedValue(projects);

      expect(await projectService.findMany()).toEqual(projects);
    });

    it('should thrown an error if repository fails', async () => {
      jest
        .spyOn(prismaService.projects, 'findMany')
        .mockRejectedValue(
          new Error(
            'Ocorreu um erro ao buscar os projetos. Tente novamente mais tarde',
          ),
        );

      await expect(projectService.findMany()).rejects.toThrow(
        'Ocorreu um erro ao buscar projetos. Tente novamente mais tarde.',
      );
    });
  });

  describe('create', () => {
    it('should create a new project', async () => {
      const project = {
        name: 'Team Manager API - Vingadores',
        description: 'Descrição',
        url: 'www.google.com',
        cover: 'www.google.com',
        technologies: ['NodeJs'],
        createdAt: new Date().toISOString(),
      };

      const response = await projectService.create(project);

      expect(response).toBeDefined();
      expect(prismaService.projects.create).toHaveBeenCalled();
      expect(response.value.name).toBe('Team Manager API - Vingadores');
    });

    it('should throw BadRequestException if error', async () => {
      const id = '1';
      const newProject = {
        id: id,
        name: 'Frontend Fusion',
        description: '',
        cover: '',
        technologies: [''],
        url: '',
        member: ['1'],
        createdAt: new Date().toISOString(),
      };

      // Simulando um erro no Prisma ao criar o projeto
      jest
        .spyOn(prismaService.projects, 'create')
        .mockRejectedValue(new BadRequestException('Erro ao criar projeto'));

      await expect(projectService.create(newProject)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findById', () => {
    it('should return a project by id', async () => {
      const project = {
        id: '1',
        createdAt: new Date().toISOString(),
        cover: '',
        technologies: ['NodeJs'],
        ...newProject,
      };
      jest
        .spyOn(prismaService.projects, 'findFirst')
        .mockResolvedValue(project);

      expect(await projectService.findById('1')).toEqual(project);
    });

    it('should throw NotFoundException if project not found', async () => {
      jest.spyOn(prismaService.projects, 'findFirst').mockResolvedValue(null);

      await expect(projectService.findById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteById', () => {
    it('should delete a project by id', async () => {
      const project = {
        id: '1',
        name: 'Frontend Fusion',
        cover: 'image.jpg',
        technologies: ['NodeJs'],
        description: '',
        url: '',
        createdAt: new Date().toISOString(),
      };
      jest
        .spyOn(prismaService.projects, 'findFirst')
        .mockResolvedValue(project);
      jest.spyOn(prismaService.projects, 'delete').mockResolvedValue(undefined);
      (deleteFile as jest.Mock).mockResolvedValue(undefined);

      await projectService.delete('1');

      expect(deleteFile).toHaveBeenCalledWith('image.jpg');
      expect(prismaService.projects.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should thrown NotFoundException if project not found', async () => {
      jest.spyOn(prismaService.projects, 'findFirst').mockResolvedValue(null);

      await expect(projectService.delete('3')).rejects.toThrow(
        'Não foi possível encontrar o projeto.',
      );
    });
  });

  describe('updateProject', () => {
    it('should update a project', async () => {
      const project = {
        id: '1',
        createdAt: new Date().toISOString(),
        cover: '',
        technologies: ['NodeJs'],
        ...newProject,
      };
      const payload = {
        name: 'Frontend Fusion',
      };

      jest
        .spyOn(prismaService.projects, 'findFirst')
        .mockResolvedValue(project);
      jest.spyOn(prismaService.projects, 'update').mockResolvedValue(undefined);

      const updatedProject = await projectService.updateProject('1', payload);
      expect(prismaService.projects.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { ...updatedProject },
      });
      expect(updatedProject.value.name).toEqual('Frontend Fusion');
    });
  });
});
