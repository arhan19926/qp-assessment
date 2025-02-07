import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './datasource';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => datasourceOptions,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
