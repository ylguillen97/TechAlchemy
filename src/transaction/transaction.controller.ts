import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('latest')
  async fetchAndSaveTransactions(@Query('address') address: string) {
    if (!address) {
      throw new HttpException('Address is required', HttpStatus.BAD_REQUEST);
    }
    const transactions =
      await this.transactionService.getLatestTransactions(address);

    const formattedTransactions = transactions.map((tx) => ({
      from: tx.from,
      to: tx.to,
      hash: tx.hash,
      value: tx.value,
      timestamp: new Date(tx.timeStamp * 1000),
    }));

    return this.transactionService.saveTransactions(formattedTransactions);
  }
}
