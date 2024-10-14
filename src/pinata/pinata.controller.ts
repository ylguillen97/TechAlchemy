import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PinataService } from './pinata.service';
import { IpfsData } from './ipfs-data.schema';

@Controller('ipfs')
export class IpfsController {
  constructor(private readonly pinataService: PinataService) {}

  @Post('upload')
  async uploadText(@Body('text') text: string): Promise<IpfsData> {
    return this.pinataService.uploadTextToPinata(text);
  }

  @Get(':hash')
  async getTextByHash(@Param('hash') hash: string): Promise<IpfsData> {
    return this.pinataService.getTextByHash(hash);
  }
}
