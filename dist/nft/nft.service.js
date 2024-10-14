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
exports.NftService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const web3_1 = require("web3");
const nft_schema_1 = require("./nft.schema");
const erc721abi_1 = require("./ERC721_ABI/erc721abi");
let NftService = class NftService {
    constructor(configService, nftModel) {
        this.configService = configService;
        this.nftModel = nftModel;
        const providerUrl = this.configService.get('INFURA_URL_MAINNET');
        if (!providerUrl) {
            throw new common_1.HttpException('INFURA_URL is not set', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        this.web3 = new web3_1.default(providerUrl);
    }
    async getNFTMetadata(contractAddress, tokenId) {
        try {
            const contract = new this.web3.eth.Contract(erc721abi_1.default, contractAddress);
            let tokenURI = await contract.methods
                .tokenURI(tokenId)
                .call();
            console.log('Token URI: ', tokenURI);
            if (!tokenURI || typeof tokenURI !== 'string') {
                throw new common_1.HttpException('Invalid tokenURI response', common_1.HttpStatus.BAD_REQUEST);
            }
            if (tokenURI.startsWith('ipfs://')) {
                tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
                console.log('Converted IPFS URI to HTTP:', tokenURI);
            }
            const metadataResponse = await fetch(tokenURI);
            const metadata = await metadataResponse.json();
            let nft = await this.nftModel.findOne({ contractAddress, tokenId });
            if (!nft) {
                nft = new this.nftModel({
                    contractAddress,
                    tokenId,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                });
                await nft.save();
            }
            return nft;
        }
        catch (error) {
            console.error('Error retrieving NFT metadata:', error);
            throw new common_1.HttpException('Error retrieving NFT metadata', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.NftService = NftService;
exports.NftService = NftService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(nft_schema_1.Nft.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], NftService);
//# sourceMappingURL=nft.service.js.map