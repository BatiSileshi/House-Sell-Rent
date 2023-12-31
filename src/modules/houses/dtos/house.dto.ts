import { Expose, Transform } from "class-transformer";
import { Profiles } from "src/modules/profiles/profiles.entity";

export class HouseDto{
    @Expose()
    id: number;

    @Expose()
    price: number;

    @Expose()
    length: number;

    @Expose()
    width: number;

    @Expose()
    description: string;

    @Expose()
    status: string;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;
    
    @Transform(({ obj }) => obj.owner.id)
    @Expose()
    owner: number;

    @Transform(({ obj }) => obj.feature ? obj.feature.id : null)
    @Expose()
    feature: number;

    @Transform(({ obj }) => obj.location ? obj.location.id : null)
    @Expose()
    location: number;

}