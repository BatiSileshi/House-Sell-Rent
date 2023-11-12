import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Houses } from "../houses/house.entity";

@Entity()
export class Pictures {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    picture: string;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP" })
    @ApiProperty()
    updated_at: Date; 

    @ManyToOne(() => Houses, (house) => house.pictures, {onDelete: 'SET NULL', nullable: true})
    house: Houses

}