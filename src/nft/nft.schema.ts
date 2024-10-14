import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Nft extends Document {
  @Prop({ required: true })
  contractAddress: string;

  @Prop({ required: true })
  tokenId: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ default: Date.now })
  lastUpdated: Date;
}

export const NftSchema = SchemaFactory.createForClass(Nft);
