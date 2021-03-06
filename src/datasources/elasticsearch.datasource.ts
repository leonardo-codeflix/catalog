import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'elasticsearch',
  connector: 'es',
  index: 'catalog',
  apiVersion: '7',
  defaultSize: '',
  configuration: {
    node: process.env.ELASTIC_SEARCH_HOST,
    requestTimeout: process.env.ELASTIC_SEARCH_TIMEOUT,
    pingTimeout: process.env.ELASTIC_SEARCH_PING
  }
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ElasticsearchDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'elasticsearch';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.elasticsearch', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
