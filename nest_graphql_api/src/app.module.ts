import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

// impot pluging for applo server
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

// custom imports
import { UsersModule } from './users/users.module';
import AppDataSource from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // initialize database
    TypeOrmModule.forRoot(AppDataSource),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      debug: true,
      //   disable graphql playground
      playground: false,

      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    UsersModule,
  ],

  exports: [],
})
export class AppModule {}
