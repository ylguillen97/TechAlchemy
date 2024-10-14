import { Document } from 'mongoose';
export declare class Nft extends Document {
    contractAddress: string;
    tokenId: string;
    name: string;
    description: string;
    image: string;
    lastUpdated: Date;
}
export declare const NftSchema: import("mongoose").Schema<Nft, import("mongoose").Model<Nft, any, any, any, Document<unknown, any, Nft> & Nft & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Nft, Document<unknown, {}, import("mongoose").FlatRecord<Nft>> & import("mongoose").FlatRecord<Nft> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;
