import { AppDataSource } from "../data-source";
import { MyGQLContext } from "./context-graphql";
import { Montadora } from "./entities/montadora.entity";
import { Modelo } from "./entities/modelo.entity";

export const resolvers = {
  Query: {
    // montadoras: () => Montadora.find()

    montadoras: async (_parent: any, _args: any, context: MyGQLContext, _info: any) => {
      console.log(`User: ${context.user}`)

      return await AppDataSource.getRepository(Montadora).find({ relations: ["modelos"] });
    },
    modelos: async (_parent: any, _args: any, context: MyGQLContext, _info: any) => {
      console.log(`User: ${context.user}`)

      return await AppDataSource.getRepository(Modelo).find({ relations: ["montadora"] }); 
    },
  },

  Mutation: {
    cadastrarMontadora: async (_:any, {nome, pais, ano_fundacao}: {nome:string, pais:string, ano_fundacao:number}  ) => {
      const montadora = AppDataSource.getRepository(Montadora);
      const novaMontadora = montadora.create({nome, pais, ano_fundacao});
      return await montadora.save(novaMontadora);
    },

    removerMontadora: async (_:any, {nome}: { nome:string} ) => {
      const montadora = AppDataSource.getRepository(Montadora);
      const nameMontadora = await montadora.findOneBy({nome})

      if(!nameMontadora) {
        throw new Error("Montadora não encontrada.");
      }

      await montadora.delete(nameMontadora.id)
      return nameMontadora;
    },

    cadastrarModelo: async (_:any, {nome, cor, modelo, montadoraId}: {nome: string, cor:string, modelo:string,  montadoraId:number}  ) => {
      const modeloRepository = AppDataSource.getRepository(Modelo);
      const montadoraRepository = AppDataSource.getRepository(Montadora)

      const montadora = await montadoraRepository.findOneBy({id:montadoraId})

      if(!montadora) {
        throw new Error("Nenhuma montadora não encontrada.");
      }

      const novoModelo = modeloRepository.create({nome, cor, modelo, montadora});
      return modeloRepository.save(novoModelo);
    },
  }



};