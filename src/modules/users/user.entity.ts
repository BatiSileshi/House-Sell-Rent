import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Houses } from "../houses/house.entity";
import { Profiles } from "../profiles/profiles.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number
    
    @Column()
    @ApiProperty()
    phone_number : string;


    @Column()
    @ApiProperty()
    password: string;


    @OneToOne(() => Profiles)
    @ApiProperty()
    @JoinColumn()
    profile: Profiles

    @CreateDateColumn()
    @ApiProperty() 
    created_at: Date;

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP" })
    @ApiProperty()
    updated_at: Date; 

}