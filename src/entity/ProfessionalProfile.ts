import { Column, Entity, Generated, ManyToOne } from 'typeorm';
import { GenericEntity } from './GenericEntity';
import { Member } from './Member';

@Entity()
export class ProfessionalProfile extends GenericEntity {
  @Generated('uuid')
  id: string;

  @Column()
  platform: string;

  @Column()
  url: string;

  @ManyToOne(() => Member, (member) => member.professionalProfile, {
    onDelete: 'CASCADE',
  })
  member: Member;
}
