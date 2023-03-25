import { Module } from '@nestjs/common';
import { BaseEntity } from 'typeorm';
import { AuditBase } from './bases/auditBase';
import { TenantBase } from './bases/TenantBase';

@Module({
    providers: [AuditBase, BaseEntity, TenantBase],
    exports: [AuditBase, BaseEntity, TenantBase]
})
export class SharedModule {}
