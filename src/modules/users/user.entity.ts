import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { House } from "../houses/house.entity";
import { Profile } from "../profiles/profiles.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    Phone_number : string;

    @Column()
    password: string;

    // @Column()
    // created:

    // @Column()
    // updated:

    @OneToMany(() => House, (house) => house.owner)
    houses: House[]

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile
}