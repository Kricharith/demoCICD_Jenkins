import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
	constructor(
		private readonly prisma: PrismaService,
	) { }

	async getProfile(userId: string) {
		return await this.prisma.profile.findFirst({
			where: {
				userId: userId
			},
		});
	}
}
