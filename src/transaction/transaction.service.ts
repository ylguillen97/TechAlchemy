import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Transaction } from './transaction.schema';

@Injectable()
export class TransactionService {
  private etherscanApiKey: string;

  constructor(
    private configService: ConfigService,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {
    this.etherscanApiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
    if (!this.etherscanApiKey) {
      throw new HttpException(
        'Etherscan API key is not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLatestTransactions(address: string): Promise<any[]> {
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${this.etherscanApiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.status !== '1') {
        throw new Error('Error retrieving transactions from Etherscan');
      }
      // Tomar solo las últimas 5 transacciones
      return response.data.result.slice(0, 5);
    } catch (error) {
      console.error('Error fetching transactions from Etherscan:', error);
      throw new HttpException(
        'Error fetching transactions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Guardar varias transacciones en MongoDB
  async saveTransactions(
    transactions: Partial<Transaction>[],
  ): Promise<Transaction[]> {
    const savedTransactions: Transaction[] = [];

    for (const tx of transactions) {
      const existingTransaction = await this.transactionModel.findOne({
        hash: tx.hash,
      });
      if (!existingTransaction) {
        const transaction = new this.transactionModel(tx);
        await transaction.save();
        savedTransactions.push(transaction);
      }
    }

    return savedTransactions;
  }

  async getTransactions(
    address: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Transaction[]> {
    return this.transactionModel
      .find({
        $or: [{ from: address }, { to: address }],
        timestamp: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }
}
