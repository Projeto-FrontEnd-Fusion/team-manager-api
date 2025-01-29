import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Project } from "../../project/schema/Project";
import { v4 as uuidv4 } from 'uuid';

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {
  @Prop({ default: uuidv4 })
  _id: string

  @Prop({ required: true, lowercase: true })
  name: string;

  @Prop({ required: true, lowercase: true })
  profileImage: string;

  @Prop({ required: true, lowercase: true })
  stack: string;

  @Prop({ required: true, lowercase: true })
  communityLevel: string;

  @Prop({ required: true, lowercase: true })
  currentSquad: string;

  @Prop([String])
  professionalProfile: string[];

  @Prop([String])
  platform: string[];

  @Prop([String])
  skills: string[];

  @Prop({ type: [SchemaFactory.createForClass(Project)], required: true })
  projects: Project[];

  @Prop([String])
  softSkills: string[];
}

export const MemberSchema = SchemaFactory.createForClass(Member);
