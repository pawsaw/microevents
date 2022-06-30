import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { PublicObject } from '../../common/public-object/public-object.base';
import { Bar } from './bar.entity';

export type FooId = string;

@ObjectType({
  implements: () => [PublicObject],
})
@Entity()
export class Foo extends PublicObject<FooId> {
  @Field({ nullable: false })
  @Column({ nullable: false })
  text: string;

  @Field(() => [Bar])
  @OneToMany(() => Bar, (bar) => bar.foo, { lazy: true })
  bars: Promise<Bar[]>;
}
