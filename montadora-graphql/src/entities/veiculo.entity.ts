import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Montadora } from "./montadora.entity";

@Entity()
export class Veiculo extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cor:string;

    @Column()
    modelo:string;

    @ManyToOne(() => Montadora, (montadora) => montadora.veiculo)
    montadora:Montadora;
}


