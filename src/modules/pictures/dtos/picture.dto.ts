import { Expose, Transform } from "class-transformer";

export class PictureDto{
    @Expose()
    id: number;

    @Expose()
    picture: string;

    @Transform(({ obj }) => obj.house ? obj.house.id : null)
    @Expose()
    house: number;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;
}