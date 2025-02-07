import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

import { Member } from '@entity/Member';
import { ProfessionalProfile } from '@entity/ProfessionalProfile';
import { Project } from '@entity/Project';

config();

const configService = new ConfigService();

const dataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DATABASE'),
  entities: [Member, Project, ProfessionalProfile],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});

export default dataSource;
