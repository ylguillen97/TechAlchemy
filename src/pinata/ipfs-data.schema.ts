import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class IpfsData extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, unique: true })
  hash: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const IpfsDataSchema = SchemaFactory.createForClass(IpfsData);
