import { Controller, Get, Param } from '@nestjs/common';
import { NftService } from './nft.service';
import { Nft } from './nft.schema';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get(':contractAddress/:tokenId')
  async getNftMetadata(
    @Param('contractAddress') contractAddress: string,
    @Param('tokenId') tokenId: string,
  ): Promise<Nft> {
    return this.nftService.getNFTMetadata(contractAddress, tokenId);
  }
}
