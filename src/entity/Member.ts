import { Column, Entity, OneToMany } from 'typeorm';

import { GenericEntity } from './GenericEntity';
import { ProfessionalProfile } from './ProfessionalProfile';
import { Project } from './Project';

@Entity()
export class Member extends GenericEntity {
  @Column({ type: 'char' })
  name: string;

  @Column()
  stack: string;

  @Column()
  communityLevel: string;

  @Column()
  currentSquad: string;

  @Column('simple-array')
  skills: string[];

  @Column('simple-array')
  softSkills: string[];

  @OneToMany(() => ProfessionalProfile, (profile) => profile.member, {
    cascade: true,
    eager: true,
  })
  professionalProfile: ProfessionalProfile[];

  @Column()
  profileImage: string;

  @OneToMany(() => Project, (project) => project.members, {
    cascade: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  projects: Project[];
}
