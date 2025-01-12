import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {
  @Prop({ required: true, lowercase: true })
  name: string;

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

  @Prop([String])
  softSkills: string[];
}

export const MemberSchema = SchemaFactory.createForClass(Member);
