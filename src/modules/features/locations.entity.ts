import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Houses } from "../houses/house.entity";

@Entity()
export class Locations {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    city: string;

    @Column()
    @ApiProperty()
    relative_location: string;

    @Column()
    @ApiProperty()
    lat: string;

    @Column()
    @ApiProperty()
    long: string;

    @Column()
    @ApiProperty()
    community: string;

    @OneToOne(() => Houses, (house)=> house.location, {onDelete: 'SET NULL', nullable: true})
    house: Houses

    // @OneToOne(() => Houses, (house) => house.location)
    // house: Houses;
}