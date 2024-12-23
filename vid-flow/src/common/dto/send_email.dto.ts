import typia from 'typia';

export type sendEmailDto = {
  id: number & typia.tags.MinLength<1>;
  recipient: string & typia.tags.Format<'email'>;
};
