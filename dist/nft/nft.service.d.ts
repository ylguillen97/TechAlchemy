import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Nft } from './nft.schema';
export declare class NftService {
    private configService;
    private nftModel;
    private web3;
    constructor(configService: ConfigService, nftModel: Model<Nft>);
    getNFTMetadata(contractAddress: string, tokenId: string): Promise<any>;
}
