import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/user.entity";

@Entity()
export class Profile{
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

    // @Column()
    // @ApiProperty()
    // created: 

    // @Column()
    // @ApiProperty()
    // created: 

    @OneToOne(() => User, (user)=> user.profile, {onDelete: 'CASCADE'})
    user: User
}