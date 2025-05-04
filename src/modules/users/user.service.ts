import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from "@infra/database/prisma/helpers/prisma.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { Either, left, right } from "@utils/either";
import { PublicUserEntity, UserEntity } from "src/entities";
import { makeHashGeneratorAdapter } from "src/factories/infra/cryptography/bcrypt";
import { UserRoles } from "src/types/RolesEnum";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prismaService: PrismaService) { }

  async create(
    payload: CreateUserDto,
  ): Promise<Either<Error, PublicUserEntity>> {
    try {
      const id = uuidv4();
      const newUser = await this.prismaService.user.create({
        data: {
          id: id,
          email: payload.email,
          createdAt: new Date().toISOString(),
          password: makeHashGeneratorAdapter().hash(payload.password),
          role: UserRoles.USER,
          token: null
        },
        omit: {
          password: true,
        }
      })

      this.logger.log(`User ${newUser.email}, id: ${newUser.id} created`)

      return right(newUser)
    } catch (err) {
      return left(new Error(err))
    }
  }

  async findByToken(token: string): Promise<Either<Error, PublicUserEntity>> {
    try {
      const userExists = await this.prismaService.user.findFirst({
        where: { token: token }
      })

      if (!userExists) return left(
        new NotFoundException(),
      )

      return right(userExists);
    } catch (err) {
      return left(new Error(err.message));
    }
  }

  async findById(id: string): Promise<Either<Error | NotFoundException, PublicUserEntity>> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id: id },
        omit: { password: true },
        include: {
          member: {
            include: {
              HardSkillsMembers: { select: { hardSkill: true } },
              SoftSkillsMembers: { select: { softSkill: true } },
              projects: true,
              professionalProfiles: true
            }
          }
        }
      })

      if (!user) return left(
        new NotFoundException('Usuário não encontrado')
      )

      return right({
        ...user,
        member: {
          ...user.member,
          hardSkills: user.member?.HardSkillsMembers.map((hsm) => hsm.hardSkill) || [],
          softSkills: user.member?.SoftSkillsMembers.map((ssm) => ssm.softSkill) || [],
        },
      });
    } catch (err) {
      return left(new Error(err.message))
    }
  }

  async findByEmail(email: string): Promise<Either<Error | NotFoundException, PublicUserEntity>> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { email: email },
        omit: { password: true },
        include: {
          member: {
            include: {
              HardSkillsMembers: { select: { hardSkill: true } },
              SoftSkillsMembers: { select: { softSkill: true } },
              projects: true,
              professionalProfiles: true
            }
          }
        }
      })

      if (!user) return left(
        new NotFoundException('Usuário não encontrado')
      )

      return right({
        ...user,
        member: {
          ...user.member,
          hardSkills: user.member?.HardSkillsMembers.map((hsm) => hsm.hardSkill) || [],
          softSkills: user.member?.SoftSkillsMembers.map((ssm) => ssm.softSkill) || [],
        },
      });
    } catch (err) {
      return left(new Error(err.message))
    }
  }

  async findMany(): Promise<Either<Error, UserEntity[] | []>> {
    try {
      const users = await this.prismaService.user.findMany();

      if (!users) return left(new Error('Usuários não encontrados.'));

      return right(users);
    } catch (err) {
      return left(new Error(err.message));
    }
  }

  async update(
    id: string,
    payload: UpdateUserDto
  ): Promise<Either<Error, UpdateUserDto>> {
    try {
      const existsUser = await this.prismaService.user.findFirst({
        where: { id: id }
      })

      if (!existsUser) return left(
        new NotFoundException('Usuário não encontrado.')
      )

      const data = {
        password: payload.password
          ? makeHashGeneratorAdapter().hash(payload.password)
          : undefined,
        email: payload.email
          ? payload.email
          : undefined
      }

      const updatedUser = await this.prismaService.user.update({
        where: { id: id },
        data: {
          ...data
        }
      })

      return right(updatedUser);
    } catch (err) {
      return left(new Error(err))
    }
  }
}