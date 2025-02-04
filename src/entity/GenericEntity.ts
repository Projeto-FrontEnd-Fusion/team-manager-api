import { Column, PrimaryColumn } from 'typeorm';

export abstract class GenericEntity {
  @PrimaryColumn({ length: 64 })
  id: string;

  @Column({ nullable: true })
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: string;
}
