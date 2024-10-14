import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    fetchAndSaveTransactions(address: string): Promise<import("./transaction.schema").Transaction[]>;
}
