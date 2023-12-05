import { Expose, Transform } from "class-transformer";
import { Profiles } from "src/modules/profiles/profiles.entity";

export class UserDto{
    @Expose()
    id: number;

    @Expose()
    phone_number: string;


    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;
    
    @Transform(({ obj }) => obj.profile.id)
    @Expose()
    profile: number;

}