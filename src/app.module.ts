import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { getEnvPath } from 'src/common/helper/env.helper';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './modules/roles/roles.module';
import { ApplicationsModule } from './modules/applications/applications.module';
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    AuthModule, SharedModule, UsersModule, 
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    DatabaseModule,
    RolesModule,
    ApplicationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
