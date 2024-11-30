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

import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // initialize database
    TypeOrmModule.forRoot(AppDataSource.options),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      debug: true,
      //   disable graphql playground
      playground: false,
      context: ({ req, res }) => ({ req, res }),

      // Im using Apollo sandbox cause thats the one I know how to use <don't judge me 😂>
      plugins: [ApolloServerPluginLandingPageLocalDefault()],

      // format error using APollo Server error formating
      formatError: (error) => {
        
        // Check if the originalError has a message and if it's an array
        let message = error.message;

        if (error.extensions['originalError']?.['message']) {
          
          const originalErrorMessage = error.extensions['originalError']?.['message'];

          // If the message is an array, join it, else just use the original message
          message = Array.isArray(originalErrorMessage)
            ? originalErrorMessage.join(', ')
            : originalErrorMessage;
        }

        // Return the custom formatted error
        return {
          message,
          path: error.path,
          locations: error.locations,
          extensions: {
            code: error.extensions['code'],
          },
        };
      },
    }),

    UsersModule,

    AuthModule,

    PostsModule,
  ],

  providers: [{ provide: 'APP_GUARD', useClass: AccessTokenGuard }], // protect all route

  exports: [],
})
export class AppModule {
  constructor() {
    console.log('AppModule initialized');
  }
}
