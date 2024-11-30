import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

/**Custom Imports**/
import { UsersService } from '../users/services/users.service';
import { AuthService } from './auth.service';
import { UserType, LoginResponseType } from '../../shared/gql-types/user.type';
import { UserEntity } from 'src/modules/users/entities/users.entity';
import { Public } from './decorators/public.decorator';
import { SignUpInput, LogInInput } from '../../shared/dtos/user.dto';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Mutation(() => UserType)
  async signUp(@Args('input') input: SignUpInput): Promise<UserEntity> {
    console.log('input', input);
    return await this.authService.registerUser(input);
  }

  @Public()
  @Mutation(() => LoginResponseType)
  async signIn(@Args('input') args: LogInInput): Promise<LoginResponseType> {
    const { access_token, user } = await this.authService.loginUser(args);

    return {
      access_token,
      user,
      message: 'Login successful',
    };
  }
}