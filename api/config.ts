import { RoutingControllersOptions } from 'routing-controllers';
import { ConnectionOptions } from 'typeorm';

export const config: IConfig = {
  db: {
    type: 'sqlite',
    name: 'default',
    database: `${__dirname}/data/db.sqlite`,
    synchronize: true,
  },
  server: {
    routePrefix: '/api',
    cors: true,
    classTransformer: true,
    controllers: [`${__dirname}/controllers/*.ts`, `${__dirname}/controllers/*.js`],
  }
}

interface IConfig {
  server: RoutingControllersOptions,
  db: ConnectionOptions,
}
