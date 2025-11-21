import { EtcdService } from '@/etcd/etcd.service';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@repo/database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly etcdService: EtcdService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  override async $connect(): Promise<void> {
    try {
      return await super.$connect();
    } catch (error) {
      const errorMessage: string =
        error instanceof Error ? error.message : 'Unknown error';
      for (const line of errorMessage.split('\n')) {
        this.logger.error(line);
      }
    }
  }
}
