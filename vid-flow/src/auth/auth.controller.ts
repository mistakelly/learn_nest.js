import { Controller, BadRequestException, Logger } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthDto } from './dto/auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { TypedBody, TypedRoute } from '@nestia/core';

// TODO: add validation constrain to password
// FIXME: This is a bug, the username is not validated using regex defined in the dto`
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @TypedRoute.Post('register')
  async register(
    @TypedBody() registerRequest: AuthDto.RegisterRequest,
  ): Promise<AuthDto.RegisterResponse> {
    return await this.authService.register(registerRequest);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}

//  "plugins": [
//       {
//         "transform": "@nestia/core/lib/transform",
//         /**
//          * Validate request body.
//          *
//          *   - "assert": Use typia.assert() function
//          *   - "is": Use typia.is() function
//          *   - "validate": Use typia.validate() function
//          *   - "assertEquals": Use typia.assertEquals() function
//          *   - "equals": Use typia.equals() function
//          *   - "validateEquals": Use typia.validateEquals() function
//          */
//         "validate": "validate",
//         /**
//          * Validate JSON typed response body.
//          *
//          *   - "assert": Use typia.assertStringify() function
//          *   - "is": Use typia.isStringify() function
//          *   - "validate": Use typia.validateStringify() function
//          *   - "stringify": Use typia.stringify() function, but dangerous
//          *   - null: Just use JSON.stringify() function, without boosting
//          */
//         "stringify": "validate"
//       },
//       {
//         "transform": "typia/lib/transform"
//       }
//     ]
