import { AppDataSource } from "../data-source";
import { MyGQLContext } from "./context-graphql";
import { Montadora } from "./entities/montadora.entity";

export const resolvers = {
  Query: {
    // montadoras: () => Montadora.find()
    montadoras: (_parent: any, _args: any, context: MyGQLContext, _info: any) => {
      console.log(`User: ${context.user}`)
      return Montadora.find()
    },
  },

  Mutation: {
    cadastrarMontadora: async (_:any, {nome}: {nome:string}  ) => {
      const montadora = AppDataSource.getRepository(Montadora);
      const novaMontadora = montadora.create({nome});
      return await montadora.save(novaMontadora);
    }
  }

};