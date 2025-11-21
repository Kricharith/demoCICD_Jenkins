import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EtcdModule } from './etcd/etcd.module';

@Module({
  imports: [DatabaseModule, EtcdModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
