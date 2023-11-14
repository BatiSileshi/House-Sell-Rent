import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profiles } from './profiles.entity';
import { Repository } from 'typeorm';

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

}
