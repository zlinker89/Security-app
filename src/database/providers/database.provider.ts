import { ConnectionOptions } from './../../../node_modules/mysql2/index.d';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule } from '@nestjs/common';
import { Enviroment } from 'src/common/enum';
export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevelopmentEnv = process.env.NODE_ENV !== Enviroment.PRODUCTION;

    const dbConfig = {
      type: config.get('DB_TYPE'),
      host: config.get('DB_HOST'),
      port: config.get('DB_PORT'),
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      autoLoadEntities: true,
      synchronize: isDevelopmentEnv,
      logging: config.get('DB_LOGGING'),
    } as ConnectionOptions;
    
    return dbConfig;
  },
});
