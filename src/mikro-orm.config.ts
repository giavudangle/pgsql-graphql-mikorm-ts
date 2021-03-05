import { MikroORM } from "@mikro-orm/core";
import { ___DB_NAME___, ___DB_USER___, ___DB_PASSWORD___, ___PROD___, ___DB_TYPE___ } from "./constants";
import { Post } from "./entities/Post";

import path from 'path'
import { User } from "./entities/User";

export default {
    dbName:___DB_NAME___,
    user:___DB_USER___,
    password:___DB_PASSWORD___,
    debug:___PROD___,
    type:___DB_TYPE___ ,
    entities:[Post,User],
    migrations: {
      tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
      path: path.join(__dirname,"./migrations"), // path to the folder with migrations
      pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
      transactional: true, // wrap each migration in a transaction
      disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
      allOrNothing: true, // wrap all migrations in master transaction
      dropTables: true, // allow to disable table dropping
      safe: false, // allow to disable table and column dropping
    },
} as Parameters<typeof MikroORM.init>[0];