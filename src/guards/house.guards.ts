import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { HousesService } from "src/modules/houses/houses.service";
import { ProfilesService } from "src/modules/profiles/profiles.service";

@Injectable()
export class HouseGuard implements CanActivate{
    constructor(private housesService: HousesService, 
        private profilesService: ProfilesService){}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const houseId = parseInt(request.params.id);

        const currentUser = request.user;
        const userProfile = await this.profilesService.findOneByUserId(request.user.sub)
        const house = await this.housesService.findOne(houseId);

        if(house && currentUser && house.owner.id === userProfile.id){
            return true;
        }

        return false;
    }
}