import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Houses } from "../houses/house.entity";

@Entity()
export class Features{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    bedrooms: number;

    @Column()
    @ApiProperty()
    bathrooms: number;

    @Column()
    @ApiProperty()
    flooring: string;

    @Column()
    @ApiProperty()
    basement: string;

    @Column()
    @ApiProperty()
    kitchen: string;

    @Column()
    @ApiProperty()
    living_rooms: number;

    @Column()
    @ApiProperty()
    total_rooms: number;

    @Column()
    @ApiProperty()
    utility: string;

    @Column()
    @ApiProperty()
    built_in: Date;

    @Column()
    @ApiProperty()
    special_thing: string;

    @ManyToOne(() => Houses, (house) => house.features, {onDelete: 'SET NULL', nullable: true})
    house: Houses

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP" })
    @ApiProperty()
    updated_at: Date; 
}