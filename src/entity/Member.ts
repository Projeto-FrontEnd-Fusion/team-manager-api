import { Column, Entity, OneToMany } from 'typeorm';
import { GenericEntity } from './GenericEntity';
import { Project } from './Project';

@Entity()
export class Member extends GenericEntity {
  @Column({ type: 'char' })
  name: string;

  @Column()
  profileImage: string;

  @Column()
  stack: string;

  @Column()
  communityLevel: string;

  @Column()
  currentSquad: string;

  @Column('json')
  professionalProfile: {
    platform: string;
    url: string;
  };

  @Column('simple-array')
  platform: string[];

  @Column('simple-array')
  skills: string[];

  @Column('simple-array')
  softSkills: string[];

  @OneToMany(() => Project, (project) => project.members, { cascade: true })
  projects: Project[];
}
