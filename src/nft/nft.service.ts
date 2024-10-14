import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Web3 from 'web3';
import { Nft } from './nft.schema';
import erc721abi from './ERC721_ABI/erc721abi';

@Injectable()
export class NftService {
  private web3: Web3;

  constructor(
    private configService: ConfigService,
    @InjectModel(Nft.name) private nftModel: Model<Nft>,
  ) {
    const providerUrl = this.configService.get<string>('INFURA_URL_MAINNET');

    if (!providerUrl) {
      throw new HttpException(
        'INFURA_URL is not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    this.web3 = new Web3(providerUrl);
  }

  async getNFTMetadata(contractAddress: string, tokenId: string): Promise<any> {
    try {
      const contract = new this.web3.eth.Contract(erc721abi, contractAddress);

      let tokenURI: string | undefined = await contract.methods
        .tokenURI(tokenId)
        .call();
      console.log('Token URI: ', tokenURI);

      if (!tokenURI || typeof tokenURI !== 'string') {
        throw new HttpException(
          'Invalid tokenURI response',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (tokenURI.startsWith('ipfs://')) {
        tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
        console.log('Converted IPFS URI to HTTP:', tokenURI);
      }
      const metadataResponse = await fetch(tokenURI);
      const metadata = await metadataResponse.json();

      let nft = await this.nftModel.findOne({ contractAddress, tokenId });

      if (!nft) {
        nft = new this.nftModel({
          contractAddress,
          tokenId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });

        await nft.save();
      }

      return nft;
    } catch (error) {
      console.error('Error retrieving NFT metadata:', error);
      throw new HttpException(
        'Error retrieving NFT metadata',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
