import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateProjectDto } from './dto/CreateProject.dto';
import { Project } from '@entity/Project';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let projectService: ProjectService;
  let projectRepository: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
      ],
    }).compile();

    projectService = module.get<ProjectService>(ProjectService);
    projectRepository = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of projects', async () => {
      const projects: Project[] = [{ id: '1', description: 'Good project' } as Project];
      jest.spyOn(projectRepository, 'find').mockResolvedValue(projects);

      expect(await projectService.findMany()).toEqual(projects);
    });

    it('should thrown an error if repository fails', async () => {
      jest
        .spyOn(projectRepository, 'find')
        .mockRejectedValue(
          new Error('Ocorreu um erro ao buscar os projetos. Tente novamente mais tarde'),
        );

      await expect(projectService.findMany()).rejects.toThrow(
        'Ocorreu um erro ao buscar os projetos. Tente novamente mais tarde',
      );
    });
  });

  describe('create', () => {
    it('should create a new project', async () => {
      const payload: CreateProjectDto = {
        description: '',
        projectName: 'Frontend Fusion',
        projectCover: '',
        technologies: [],
        projectUrl: '',
        members: [],
      };
      const project: Project = { id: '1', projectName: 'Frontend Fusion' } as Project;
      jest.spyOn(projectRepository, 'create').mockReturnValue(project);
      jest.spyOn(projectRepository, 'save').mockResolvedValue(project);

      expect(await projectService.create(payload)).toEqual(project);
    });

    it('should throw BadRequestException if error', async () => {
      const id = '1';
      const newProject = {
        id: id,
        description: '',
        projectName: 'Frontend Fusion',
        projectCover: '',
        technologies: [],
        projectUrl: '',
        members: [],
        createdAt: new Date().toISOString(),
      };
      jest.spyOn(projectRepository, 'create').mockReturnValue(newProject as Project);

      await expect(projectService.create(newProject)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findById', () => {
    it('should return a project by id', async () => {
      const project: Project = { id: '1', projectName: 'Frontend Fusion' } as Project;
      jest.spyOn(projectRepository, 'findOne').mockResolvedValue(project);

      expect(await projectService.findById('1')).toEqual(project);
    });

    it('should throw NotFoundException if project not found', async () => {
      jest.spyOn(projectRepository, 'findOne').mockResolvedValue(null);

      await expect(projectService.findById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteById', () => {
    it('should delete a project by id', async () => {
      const project: Project = { id: '1', projectName: 'Frontend Fusion' } as Project;
      jest.spyOn(projectRepository, 'findOne').mockResolvedValue(project);
      jest.spyOn(projectRepository, 'delete').mockResolvedValue(undefined);

      await projectService.deleteById('1');

      expect(projectRepository.delete).toHaveBeenCalledWith({ id: '1' });
    });

    it('should thrown NotFoundException if project not found', async () => {
      jest.spyOn(projectRepository, 'findOne').mockResolvedValue(null);

      await expect(projectService.deleteById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProject', () => {
    it('should update a project', async () => {
      const project: Project = {
        id: '1',
        projectName: 'Projeto Frontend Fusion',
        description: '',
        projectCover: '',
        technologies: [],
        projectUrl: '',
        members: [],
      } as Project;
      const payload: Partial<Project> = {
        projectName: 'Frontend Fusion',
      } as Project;

      jest.spyOn(projectRepository, 'findOne').mockResolvedValue(project);
      jest.spyOn(projectRepository, 'update').mockResolvedValue(undefined);

      const updatedProject = await projectService.updateProject('1', payload);
      if (updatedProject instanceof Project) {
        expect(updatedProject.projectName).toEqual('Frontend Fusion');
      }
      expect(projectRepository.update).toHaveBeenCalledWith({ id: '1' }, updatedProject);
    });
  });
});
