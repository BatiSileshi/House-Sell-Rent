import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Users } from "../users/user.entity";
import { Houses } from "../houses/house.entity";

@Entity()
export class Profiles{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({nullable: true})
    @ApiProperty()
    phone_number: string;

    @Column({default: true})
    @ApiProperty()
    is_phone_number_verified: boolean;

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

    @OneToMany(() => Houses, (house) => house.owner)
    @ApiProperty()
    houses: Houses[]

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP" })
    @ApiProperty()
    updated_at: Date; 

    @OneToOne(() => Users, (user)=> user.profile, {onDelete: 'CASCADE'})
    user: Users
}