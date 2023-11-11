import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/user.entity";


@Entity()
export class House {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    price: number;

    @Column()
    @ApiProperty()
    length: number;

    @Column()
    @ApiProperty()
    width: number;

    @Column()
    @ApiProperty()
    description: string;

    @Column()
    @ApiProperty()
    status: string;

    @ManyToOne(() => User, (owner) => owner.houses, {onDelete: 'SET NULL', nullable: true})
    owner: User

    //location

    // @Column()
    // @ApiProperty()
    // created: Date;

    // @Column()
    // @ApiProperty()
    // updated: Date;

}