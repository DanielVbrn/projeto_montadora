import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Veiculo } from "./veiculo.entity";

@Entity()
export class Montadora extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    nome: String;

    @OneToMany(() => Veiculo, (veiculo) => veiculo.montadora)
    veiculo:Veiculo;

}


