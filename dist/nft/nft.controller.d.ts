import { NftService } from './nft.service';
import { Nft } from './nft.schema';
export declare class NftController {
    private readonly nftService;
    constructor(nftService: NftService);
    getNftMetadata(contractAddress: string, tokenId: string): Promise<Nft>;
}
