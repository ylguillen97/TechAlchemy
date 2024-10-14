import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PinataService } from './pinata.service';
import { IpfsController } from './pinata.controller';
import { IpfsData, IpfsDataSchema } from './ipfs-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IpfsData.name, schema: IpfsDataSchema },
    ]),
  ],
  controllers: [IpfsController],
  providers: [PinataService],
})
export class PinataModule {}
