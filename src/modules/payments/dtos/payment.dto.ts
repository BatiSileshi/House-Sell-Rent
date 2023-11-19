import { Expose, Transform } from "class-transformer";

export class PaymentDto{
    @Expose()
    id: number;

    @Expose()
    amount: number;

    @Expose()
    currency: string;

    @Expose()
    email: string;

    @Expose()
    first_name: string;

    @Expose()
    last_name: string;

    @Expose()
    phone_number: string;

    @Expose()
    tx_ref: string;

    @Expose()
    status: string;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;

    @Transform(({ obj }) => obj.payment_method ? obj.payment_method.id : null)
    @Expose()
    payment_method: number;

    @Transform(({ obj }) => obj.house ? obj.house.id : null)
    @Expose()
    house: number;
}