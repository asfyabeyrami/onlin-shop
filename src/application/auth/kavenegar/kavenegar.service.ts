import { Injectable, Logger } from '@nestjs/common';
import { KavenegarOptions, KavenegarResponse } from './interfaces/kavenegar-options.interface';
import * as https from 'https';
import * as querystring from 'querystring';

@Injectable()
export class KavenegarService {
  private readonly options: {
    host: string;
    version: string;
    apikey: string;
  };
  private readonly logger = new Logger(KavenegarService.name);

  constructor(options: KavenegarOptions) {
    this.options = {
      host: 'api.kavenegar.com',
      version: 'v1',
      apikey: options.apikey,
    };
  }

  private request(
    action: string,
    method: string,
    params: any
  ): Promise<KavenegarResponse> {
    return new Promise((resolve, reject) => {
      const path = `/${this.options.version}/${this.options.apikey}/${action}/${method}.json`;
      const postdata = querystring.stringify(params);

      const postOptions = {
        host: this.options.host,
        port: '443',
        path,
        method: 'POST',
        headers: {
          'Content-Length': postdata.length,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      };

      const req = https.request(postOptions, (res) => {
        res.setEncoding('utf8');
        let result = '';

        res.on('data', (data) => {
          result += data;
        });

        res.on('end', () => {
          try {
            const jsonObject = JSON.parse(result);
            resolve({
              entries: jsonObject.entries,
              status: jsonObject.return.status,
              message: jsonObject.return.message,
            });
          } catch (error) {
            this.logger.error('Kavenegar API Error:', error);
            reject(error);
          }
        });
      });

      req.on('error', (error) => {
        this.logger.error('Kavenegar Request Error:', error);
        reject(error);
      });

      req.write(postdata, 'utf8');
      req.end();
    });
  }

  async verifyLookup(data: {
    receptor: string;
    token: string;
    template: string;
  }): Promise<KavenegarResponse> {
    return this.request('verify', 'lookup', data);
  }

  async send(data: {
    receptor: string;
    message: string;
  }): Promise<KavenegarResponse> {
    return this.request('sms', 'send', data);
  }
} 