import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

/**Custom Imports**/
import { UsersService } from '../users/services/users.service';
import { AuthService } from './auth.service';
import { UserType, LoginResponseType } from '../../shared/gql-types/user.type';
import { UserEntity } from 'src/entities/users.entity';
import { Public } from './decorators/public.decorator';
import {
  SignUpInput,
  LogInInput,
} from '../../shared/dtos/user.dto';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Mutation(() => UserType)
  async signUp(@Args('input') input: SignUpInput): Promise<UserEntity> {
    return await this.authService.registerUser(input);
  }

  // @Public()
  @Mutation(() => LoginResponseType)
  async signIn(@Args('input') args: LogInInput): Promise<LoginResponseType> {
    const { access_token } = await this.authService.loginUser(args);

    return {
      access_token,
      message: 'Login successful',
    };
  }

  // @Public()
  @Query(() => String)
  async hello() {
    return "Finally we made it ' 🚀";
  }
}
