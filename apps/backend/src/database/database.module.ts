import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { EtcdModule } from '@/etcd/etcd.module';
import { ProfileService } from './profile/profile.service';
import { ProfileController } from './profile/profile.controller';

@Module({
  providers: [PrismaService, ProfileService],
  imports: [EtcdModule],
  exports: [PrismaService, ProfileService],
  controllers: [ProfileController],
})
export class DatabaseModule {}
