import {  Controller, Get, NotFoundException, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    //Controller for getOrganizationByUserId
    @Get('profile-by-user-id')
    @ApiOperation({ summary: "Get profiles associated with user" })
    @ApiOkResponse({
        description: 'Profile are retrieved successfully'
    })
    async getProfileByUserId( @Param('id', ParseIntPipe) id: string) {
        const profile = await this.profileService.getProfile(id);
        if (profile) {
            return profile;
        } else {
            throw new NotFoundException('Profile not found');
    }
    }

}
