import { AppDataSource } from "../data-source";
import { MyGQLContext } from "./context-graphql";
import { Montadora } from "./entities/montadora.entity";
import { Veiculo } from "./entities/veiculo.entity";

export const resolvers = {
  Query: {
    // montadoras: () => Montadora.find()

    montadoras: async (_parent: any, _args: any, context: MyGQLContext, _info: any) => {
      console.log(`User: ${context.user}`)

      return await AppDataSource.getRepository(Montadora).find({ relations: ["veiculos"] });
    },
    veiculos: async (_parent: any, _args: any, context: MyGQLContext, _info: any) => {
      console.log(`User: ${context.user}`)

      return await AppDataSource.getRepository(Veiculo).find({ relations: ["montadora"] }); 
    },
  },

  Mutation: {
    cadastrarMontadora: async (_:any, {nome}: {nome:string}  ) => {
      const montadora = AppDataSource.getRepository(Montadora);
      const novaMontadora = montadora.create({nome});
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

    cadastrarVeiculo: async (_:any, {cor, modelo, montadoraId}: {cor:string, modelo:string, montadoraId:number}  ) => {
      const veiculoRepository = AppDataSource.getRepository(Veiculo);
      const montadoraRepository = AppDataSource.getRepository(Montadora)

      const montadora = await montadoraRepository.findOneBy({id:montadoraId})

      if(!montadora) {
        throw new Error("Nenhuma montadora não encontrada.");
      }

      const novoVeiculo = veiculoRepository.create({cor, modelo, montadora});
      return veiculoRepository.save(novoVeiculo);
    },
  }



};