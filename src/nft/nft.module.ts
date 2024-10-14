import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { Nft, NftSchema } from './nft.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Nft.name, schema: NftSchema }])],
  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
