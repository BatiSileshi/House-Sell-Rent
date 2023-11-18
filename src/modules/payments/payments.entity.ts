import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";   
import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethods } from "./methods.entity";

@Entity()
export class Payments{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    amount: number;

    @Column({ default: "ETB"})
    @ApiProperty()
    currency: string;

    @Column()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    first_name: string;

    @Column()
    @ApiProperty()
    last_name: string;

    @Column()
    @ApiProperty()
    phone_number: string;

    @Column()
    @ApiProperty()
    tx_ref: string;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP" })
    @ApiProperty()
    updated_at: Date; 

    @ApiProperty()
    @ManyToOne(() => PaymentMethods, (payment_method) => payment_method.payments)
    payment_method: PaymentMethods

}