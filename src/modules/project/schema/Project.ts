import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
@Schema()
export class Project {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  projectCover: string;

  @Prop({ required: true })
  description: string;

  @Prop([String])
  technologies: string[];

  @Prop({ required: true })
  projectUrl: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
