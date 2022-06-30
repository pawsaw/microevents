import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FooModule } from './foo/foo.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'microevents',
      password: 'Micro246_',
      database: 'microevents',
      entities: [
        join(__dirname, `./**/*.entity.{ts,js}`),
        join(__dirname, `./**/*.relation.{ts,js}`),
      ],
      // entities: [join(__dirname, `../**/*.entity.{ts,js}`)],
      synchronize: true,
      logger: 'advanced-console',
      logging: true,
      dropSchema: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    FooModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
