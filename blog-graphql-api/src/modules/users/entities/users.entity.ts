import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { PostEntity } from '../../posts/entities/post.entity';

@ObjectType()
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  // omit @Field() decorator so GraphQl doesn't expose password for security reasons.
  password: string;

  // Establish relation
  @OneToMany(() => PostEntity, (post) => post.user, { cascade: true })
  @Field(() => [PostEntity], { nullable: true })
  posts: PostEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;
}
