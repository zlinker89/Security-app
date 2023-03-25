import { CommandModule } from 'nestjs-command';
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
import { TenantModule } from './modules/tenant/tenant.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { SeedCommand } from './commands/SeedCommand';
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    AuthModule, SharedModule, UsersModule, 
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    DatabaseModule,
    RolesModule,
    ApplicationsModule,
    TenantModule,
    PermissionsModule,
    CommandModule
  ],
  controllers: [AppController],
  providers: [SeedCommand, AppService],
})
export class AppModule {}
