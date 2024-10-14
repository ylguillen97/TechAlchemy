// src/ipfs/pinata.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IpfsData } from './ipfs-data.schema';

@Injectable()
export class PinataService {
  private readonly pinataApiKey: string;
  private readonly pinataSecretApiKey: string;

  constructor(
    private configService: ConfigService,
    @InjectModel(IpfsData.name) private ipfsDataModel: Model<IpfsData>,
  ) {
    this.pinataApiKey = this.configService.get<string>('PINATA_API_KEY');
    this.pinataSecretApiKey = this.configService.get<string>(
      'PINATA_SECRET_API_KEY',
    );
  }

  async uploadTextToPinata(text: string): Promise<IpfsData> {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const body = { text };

    try {
      const response = await axios.post(url, body, {
        headers: {
          pinata_api_key: this.pinataApiKey,
          pinata_secret_api_key: this.pinataSecretApiKey,
        },
      });

      const hash = response.data.IpfsHash;

      const ipfsData = new this.ipfsDataModel({ text, hash });
      return ipfsData.save();
    } catch (error) {
      console.error('Error uploading text to Pinata:', error);
      throw new HttpException(
        'Error uploading text to Pinata',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTextByHash(hash: string): Promise<IpfsData> {
    const data = await this.ipfsDataModel.findOne({ hash });
    if (!data) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }
}
