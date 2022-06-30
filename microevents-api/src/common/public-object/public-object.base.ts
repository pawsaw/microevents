import { Life } from '../entities/life.embedded';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class PublicObject<TEntityId extends string> {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: TEntityId;

  @Field(() => Life)
  @Column(() => Life, { prefix: '' })
  life: Life;
}
