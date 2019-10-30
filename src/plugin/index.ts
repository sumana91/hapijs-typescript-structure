import Config from '../config';
import * as Hapi from '@hapi/hapi';
import logger from '../helper/logger';

export default class Plugins {
  public static async status(server: Hapi.Server): Promise<Error | any> {
    try {
      logger.info('Plugins - Registering status-monitor');
      await Plugins.register(server, {
        options: Config.status.options,
        plugin: require('hapijs-status-monitor'),
      });
    } catch (error) {
      logger.info(
        `Plugins - Ups, something went wrong when registering status plugin: ${error}`
      );
    }
  }

  public static async swagger(server: Hapi.Server): Promise<Error | any> {
    try {
      logger.info('Plugins - Registering swagger-ui');
      await Plugins.register(server, [
        require('vision'),
        require('inert'),
        {
          options: Config.swagger.options,
          plugin: require('hapi-swagger'),
        },
      ]);
    } catch (error) {
      logger.info(
        `Plugins - Ups, something went wrong when registering swagger-ui plugin: ${error}`
      );
    }
  }

  public static async registerAll(server: Hapi.Server): Promise<Error | any> {
    if (process.env.NODE_ENV === 'development') {
      await Plugins.status(server);
      await Plugins.swagger(server);
    }
  }

  private static async register(
    server: Hapi.Server,
    plugin: any
  ): Promise<void> {
    logger.debug('registering: ' + JSON.stringify(plugin));
    return new Promise((resolve, reject) => {
      server.register(plugin);
      resolve();
    });
  }
}
