import {MikroORM} from "@mikro-orm/core"
import { ___prod___ } from "./constants"

const root = async () => {
  const orm = await MikroORM.init({
    dbName:process.env.DB_NAME,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    debug:!___prod___,
    entities:[]
  })
}



