import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Payments } from "./payments.entity";

@Entity()
export class PaymentMethods{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    payment_type: string;

    @Column()
    @ApiProperty()
    logo: string;

    @Column({ unique: true})
    @ApiProperty()
    payment_method_identifier: string;

    @Column()
    @ApiProperty()
    customer_service: string;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP" })
    @ApiProperty()
    updated_at: Date; 

    @OneToMany(() => Payments, (payment) => payment.payment_method)
    @ApiProperty()
    payments: Payments[]

}