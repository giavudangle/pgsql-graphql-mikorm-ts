import {MikroORM} from "@mikro-orm/core"
import { ___DB_NAME___, ___DB_PASSWORD___, ___DB_TYPE___, ___DB_USER___, ___PROD___ } from "./constants"

import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";

const root = async () => {
  const orm = await MikroORM.init(mikroOrmConfig)

  await orm.getMigrator().up();

  const post = await orm.em.find(Post,{});
  console.log(post);
  
}

root()
.catch(e => console.log(e))



