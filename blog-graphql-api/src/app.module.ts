import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

// impot pluging for applo server
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

// custom imports
import { UsersModule } from 'src/modules/users/users.module';
import AppDataSource from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AccessTokenGuard } from 'src/modules/auth/guards/jwt.guard';

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
      context: ({ req, res }) => ({ req, res }),

      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    UsersModule,

    AuthModule,
  ],

  providers: [{ provide: 'APP_GUARD', useClass: AccessTokenGuard }], // protect all route

  exports: [],
})
export class AppModule {}
