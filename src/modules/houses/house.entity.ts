import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, 
    CreateDateColumn, UpdateDateColumn, 
    OneToMany, OneToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Users } from "../users/user.entity";
import { Features } from "../features/features.entity";
import { Locations } from "../locations/locations.entity";
import { Pictures } from "../pictures/pictures.entity";

@Entity()
export class Houses {
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

    @OneToMany(() => Features, (feature) => feature.house)
    @ApiProperty()
    features: Features[]

    @OneToMany(() => Pictures, (picture) => picture.house)
    @ApiProperty()
    pictures: Pictures[]

    @ManyToOne(() => Users, (owner) => owner.houses, {onDelete: 'SET NULL', nullable: true})
    owner: Users

    @OneToOne(() => Locations)
    @ApiProperty()
    @JoinColumn()
    location: Locations

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP" })
    @ApiProperty()
    updated_at: Date; 
}