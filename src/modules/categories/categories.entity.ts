import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Houses } from "../houses/house.entity";

@Entity()
export class Categories{  
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()   
    category: string;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP" })
    @ApiProperty()
    updated_at: Date; 

    @OneToMany(() => Houses, (house) => house.category)
    @ApiProperty()
    houses: Houses[]
}