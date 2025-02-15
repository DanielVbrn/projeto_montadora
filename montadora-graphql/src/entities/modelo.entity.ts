import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Montadora } from "./montadora.entity";

@Entity()
export class Modelo extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome:string;

    @Column()
    cor:string;

    @Column()
    modelo:string;

    @ManyToOne(() => Montadora, (montadora) => montadora.modelos)
    montadora:Montadora;
}


