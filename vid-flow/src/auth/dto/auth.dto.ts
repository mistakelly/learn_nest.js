import typia from 'typia';

let USERNAME_FORMAT = '^[a-z][a-zA-Z0-9_-]{3,20}$';

export namespace AuthDto {
  export type RegisterRequest = {
    username: string & typia.tags.Pattern<typeof USERNAME_FORMAT>;
    email: string & typia.tags.Format<'email'>;
    password: string;
  };

  export type RegisterResponse = {
    id: number;
    username: string;
    email: string;
    accessToken: string;
  };
}
