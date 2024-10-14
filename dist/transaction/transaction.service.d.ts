import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Transaction } from './transaction.schema';
export declare class TransactionService {
    private configService;
    private transactionModel;
    private etherscanApiKey;
    constructor(configService: ConfigService, transactionModel: Model<Transaction>);
    getLatestTransactions(address: string): Promise<any[]>;
    saveTransactions(transactions: Partial<Transaction>[]): Promise<Transaction[]>;
    getTransactions(address: string, startDate: Date, endDate: Date): Promise<Transaction[]>;
}
