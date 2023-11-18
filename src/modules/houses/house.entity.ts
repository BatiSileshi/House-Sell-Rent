import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, 
    CreateDateColumn, UpdateDateColumn, 
    OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Features } from "../features/features.entity";
import { Locations } from "../features/locations.entity";
import { Pictures } from "../pictures/pictures.entity";
import { Profiles } from "../profiles/profiles.entity";
import { Categories } from "../categories/categories.entity";


@Entity()
export class Houses {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ default: 0 })
    @ApiProperty()
    price: number;

    @Column({ nullable: true})
    @ApiProperty()
    length: number;

    @Column({ nullable: true})
    @ApiProperty()
    width: number;

    @Column({ nullable: true})
    @ApiProperty()
    description: string;

    @Column({default: 'listed'})
    @ApiProperty()
    status: string;


    @OneToMany(() => Pictures, (picture) => picture.house)
    @ApiProperty()
    pictures: Pictures[]
 
    @ApiProperty()
    @ManyToOne(() => Profiles, (owner) => owner.houses)
    owner: Profiles;


    @OneToOne(() => Locations, (location) => location.house, { cascade: true})
    @JoinColumn()
    location: Locations


    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP" })
    @ApiProperty()
    updated_at: Date; 


    @OneToOne(() => Features, (feature) => feature.house, { onDelete: 'SET NULL' , nullable:true})
    @JoinColumn()
    feature: Features;


    // @OneToOne(() => Locations, { onDelete: 'SET NULL', nullable: true })
    // @JoinColumn()
    // location: Locations;

    
    @ManyToOne(() => Categories, (category) => category.houses)
    @ApiProperty()
    category: Categories 
}