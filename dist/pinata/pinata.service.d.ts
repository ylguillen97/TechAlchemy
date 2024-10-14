import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { IpfsData } from './ipfs-data.schema';
export declare class PinataService {
    private configService;
    private ipfsDataModel;
    private readonly pinataApiKey;
    private readonly pinataSecretApiKey;
    constructor(configService: ConfigService, ipfsDataModel: Model<IpfsData>);
    uploadTextToPinata(text: string): Promise<IpfsData>;
    getTextByHash(hash: string): Promise<IpfsData>;
}
