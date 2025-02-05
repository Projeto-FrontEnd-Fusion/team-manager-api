import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { GenericEntity } from './GenericEntity';
import { Member } from './Member';

@Entity()
export class Project extends GenericEntity {
  @Column()
  projectName: string;

  @Column()
  projectCover: string;

  @Column()
  description: string;

  @Column('simple-array')
  technologies: string[];

  @Column()
  projectUrl: string;

  @ManyToMany(() => Member, (member) => member.projects, {
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable()
  members: Member[];
}
