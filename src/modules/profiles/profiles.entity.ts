import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Users } from "../users/user.entity";

@Entity()
export class Profiles{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    phone_number2: string;
    
    @Column()
    @ApiProperty()
    avatar: string;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP" })
    @ApiProperty()
    updated_at: Date; 

    @OneToOne(() => Users, (user)=> user.profile, {onDelete: 'CASCADE'})
    user: Users
}