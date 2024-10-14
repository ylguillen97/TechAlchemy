"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const transaction_schema_1 = require("./transaction.schema");
let TransactionService = class TransactionService {
    constructor(configService, transactionModel) {
        this.configService = configService;
        this.transactionModel = transactionModel;
        this.etherscanApiKey = this.configService.get('ETHERSCAN_API_KEY');
        if (!this.etherscanApiKey) {
            throw new common_1.HttpException('Etherscan API key is not set', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLatestTransactions(address) {
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${this.etherscanApiKey}`;
        try {
            const response = await axios_1.default.get(url);
            if (response.data.status !== '1') {
                throw new Error('Error retrieving transactions from Etherscan');
            }
            return response.data.result.slice(0, 5);
        }
        catch (error) {
            console.error('Error fetching transactions from Etherscan:', error);
            throw new common_1.HttpException('Error fetching transactions', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async saveTransactions(transactions) {
        const savedTransactions = [];
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
    async getTransactions(address, startDate, endDate) {
        return this.transactionModel
            .find({
            $or: [{ from: address }, { to: address }],
            timestamp: { $gte: startDate, $lte: endDate },
        })
            .exec();
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map