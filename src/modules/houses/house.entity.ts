import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, 
    CreateDateColumn, UpdateDateColumn, 
    OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Features } from "../features/features.entity";
import { Locations } from "../locations/locations.entity";
import { Pictures } from "../pictures/pictures.entity";
import { Profiles } from "../profiles/profiles.entity";
import { Categories } from "../categories/categories.entity";


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

    @Column({default: 'listed'})
    @ApiProperty()
    status: string;

    @OneToMany(() => Features, (feature) => feature.house)
    @ApiProperty()
    features: Features[]

    @OneToMany(() => Pictures, (picture) => picture.house)
    @ApiProperty()
    pictures: Pictures[]
 
    @ApiProperty()
    @ManyToOne(() => Profiles, (owner) => owner.houses)
    owner: Profiles;

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

    
    @ManyToOne(() => Categories, (category) => category.houses)
    @ApiProperty()
    category: Categories 
}