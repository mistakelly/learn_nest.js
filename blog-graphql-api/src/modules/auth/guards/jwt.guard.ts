import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}

// return ctx.getContext().req;

// const gqlExecutionContext = GqlExecutionContext.create(context);
// const gqlContext = gqlExecutionContext.getContext();
// const gqlArgs = gqlExecutionContext.getArgs();

// // console.log('gqlArgs', gqlArgs);
// // console.log('gqlContext', gqlContext.req.headers);

// gqlContext.req.body = { ...gqlContext.req.body, ...gqlArgs };
// return gqlContext.req;
