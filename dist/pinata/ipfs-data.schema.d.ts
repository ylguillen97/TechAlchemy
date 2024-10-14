import { Document } from 'mongoose';
export declare class IpfsData extends Document {
    text: string;
    hash: string;
    createdAt: Date;
}
export declare const IpfsDataSchema: import("mongoose").Schema<IpfsData, import("mongoose").Model<IpfsData, any, any, any, Document<unknown, any, IpfsData> & IpfsData & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IpfsData, Document<unknown, {}, import("mongoose").FlatRecord<IpfsData>> & import("mongoose").FlatRecord<IpfsData> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;
