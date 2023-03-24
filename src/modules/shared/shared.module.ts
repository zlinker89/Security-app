import { Module } from '@nestjs/common';
import { AuditBase } from './bases/auditBase';

@Module({
    providers: [AuditBase],
    exports: [AuditBase]
})
export class SharedModule {}
