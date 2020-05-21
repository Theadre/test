import 'reflect-metadata';
import { createExpressServer, useContainer, RoutingControllersOptions } from 'routing-controllers';
import { Container } from 'typedi';
import { createConnection, ConnectionOptions } from 'typeorm';
import { Application } from 'express';
import * as express from 'express';
import { FakeData } from './api/model/fake.data';

import { config } from './api/config';
import { join } from 'path';

useContainer(Container);

class MyApp {

  constructor() { }

  dbConfig() {
    const opts: ConnectionOptions = {
      type: 'sqlite',
      name: 'default',
      database: `${__dirname}/api/data/db.sqlite`,
      entities: [`${__dirname}/api/model/*{.js,.ts}`],
      synchronize: true,
    }

    createConnection(opts)
      .then(() => console.log('Create connection with database has done successfully'))
      .then(async () => await new FakeData().insertSomeFakeData())
      .catch(e => console.log(e))
      ;

    return this;
  }

  start(): Application {

    const opts: RoutingControllersOptions = {
      routePrefix: '/api',
      cors: true,
      classTransformer: true,
      controllers: [`${__dirname}/api/controllers/*.ts`, `${__dirname}/api/controllers/*.js`],
    }


    return createExpressServer(opts);
  }
}


const PORT = process.env.PORT || 3001;
const myApp = new MyApp();

myApp
  .dbConfig()
  .start()
  .use(express.static(join(__dirname, '/api/public')))
  .use((_req, _res) => _res.sendFile(join(__dirname, '/api/public', 'index.html')))
  .listen(PORT, () => {
    console.log(join(__dirname, '/api/public', 'index.html'));
    console.log(`Listening at http://localhost:${PORT}/`)
  } )
  ;


