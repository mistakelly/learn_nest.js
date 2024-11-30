import { ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/users.entity';
import { ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @IsString()
  @Column()
  @Field()
  title: string;

  @IsString()
  @Column()
  @Field()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  @Field(() => UserEntity)
  user: UserEntity; // The user who created this post

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date;
}
