import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

export type EntityManagerContextType = {
  em:EntityManager<IDatabaseDriver<Connection>>
}