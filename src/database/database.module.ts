import { Module } from '@nestjs/common';
import { DatabaseProvider } from './providers/database.provider';


@Module({
  imports: [
    DatabaseProvider
  ],
  exports: [DatabaseProvider]
})
export class DatabaseModule {}
