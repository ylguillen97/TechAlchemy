import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  timestamp: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
