import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profiles } from './profiles.entity';
import { Repository } from 'typeorm';
import { UpdatePhoneNumberDto } from './dtos/update-phone-number.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profiles) private repo: Repository<Profiles>){}
    create(profileData: Partial<Profiles>){
        const profile = this.repo.create(profileData)
        return this.repo.save(profile);
    }

    async findOneByUserId(userId: number): Promise<Profiles> {
        const profile = await this.repo.findOne({ where: { user: { id: userId } } });
        if (!profile) {
          throw new NotFoundException('Profile not found.');
        }
        return profile;
      }

    async updatePhoneNumber(id: number, updatePhoneNumberDto: UpdatePhoneNumberDto){
      const profile = await this.findOneByUserId(id);
      if(!profile){
          throw new NotFoundException('User not found.');
      }

      Object.assign(profile, updatePhoneNumberDto);

      const updateProfilePhoneNumber = await this.repo.save(profile);
      return updateProfilePhoneNumber;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto){
    const profile = await this.findOneByUserId(id);
    if(!profile){
      throw new NotFoundException('Profile not found.')
    }

    Object.assign(profile, updateProfileDto);

    const updatedProfile = await this.repo.save(profile);
    return updatedProfile;
  }

}
