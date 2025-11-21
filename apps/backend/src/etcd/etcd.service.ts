import { Injectable, Logger } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

@Injectable()
export class EtcdService {
  private _client: Etcd3;
  private readonly url: string;
  private readonly logger = new Logger(EtcdService.name);

  constructor() {
    this.url = process.env.ETCD_URL || 'http://localhost:2379';
  }

  get client(): Etcd3 {
    if (!this._client) {
      try {
        this._client = new Etcd3({
          hosts: this.url,
          auth: {
            username: process.env.ETCD_USER || 'root',
            password: process.env.ETCD_PASSWORD || 'smartasset',
          },
        });
      } catch (error) {
        this.logger.error('Failed to connect to etcd', error);
        throw error;
      }
    }
    return this._client;
  }

  async verifyUser(username: string, password: string): Promise<boolean> {
    try {
      const testClient = new Etcd3({
        hosts: this.url,
        auth: {
          username,
          password,
        },
      });
      await testClient.get('test').exists();
      this.logger.debug(`User verified: ${username}`);
      return true;
    } catch (error) {
      this.logger.warn(`User verification failed: ${username}`, error);
      return false;
    }
  }
}
