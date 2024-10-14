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
exports.PinataService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const ipfs_data_schema_1 = require("./ipfs-data.schema");
let PinataService = class PinataService {
    constructor(configService, ipfsDataModel) {
        this.configService = configService;
        this.ipfsDataModel = ipfsDataModel;
        this.pinataApiKey = this.configService.get('PINATA_API_KEY');
        this.pinataSecretApiKey = this.configService.get('PINATA_SECRET_API_KEY');
    }
    async uploadTextToPinata(text) {
        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        const body = { text };
        try {
            const response = await axios_1.default.post(url, body, {
                headers: {
                    pinata_api_key: this.pinataApiKey,
                    pinata_secret_api_key: this.pinataSecretApiKey,
                },
            });
            const hash = response.data.IpfsHash;
            const ipfsData = new this.ipfsDataModel({ text, hash });
            return ipfsData.save();
        }
        catch (error) {
            console.error('Error uploading text to Pinata:', error);
            throw new common_1.HttpException('Error uploading text to Pinata', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTextByHash(hash) {
        const data = await this.ipfsDataModel.findOne({ hash });
        if (!data) {
            throw new common_1.HttpException('Data not found', common_1.HttpStatus.NOT_FOUND);
        }
        return data;
    }
};
exports.PinataService = PinataService;
exports.PinataService = PinataService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(ipfs_data_schema_1.IpfsData.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], PinataService);
//# sourceMappingURL=pinata.service.js.map