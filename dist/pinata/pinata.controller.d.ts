import { PinataService } from './pinata.service';
import { IpfsData } from './ipfs-data.schema';
export declare class IpfsController {
    private readonly pinataService;
    constructor(pinataService: PinataService);
    uploadText(text: string): Promise<IpfsData>;
    getTextByHash(hash: string): Promise<IpfsData>;
}
