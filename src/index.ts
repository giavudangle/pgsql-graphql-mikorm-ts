import {MikroORM} from "@mikro-orm/core"
import { ___DB_NAME___, ___DB_PASSWORD___, ___DB_TYPE___, ___DB_USER___, ___PROD___ } from "./constants"

import mikroOrmConfig from "./mikro-orm.config";

import express from 'express';

import {buildSchema} from 'type-graphql'

import {ApolloServer} from 'apollo-server-express'
import { HelloResolver } from "./resolvers/hello";

const root = async () => {
  const orm = await MikroORM.init(mikroOrmConfig)

  await orm.getMigrator().up();

  const app =express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers:[HelloResolver],
      validate:false,
    })
  })

  apolloServer.applyMiddleware({app});

  app.listen(4000,() => {
    console.log("Server started successfully");
  })
  
}

root()
.catch(e => console.log(e))



