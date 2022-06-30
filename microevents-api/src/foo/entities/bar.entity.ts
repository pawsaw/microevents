import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne } from 'typeorm';
import { PublicObject } from '../../common/public-object/public-object.base';
import { Foo } from './foo.entity';

export type BarId = string;

@ObjectType({
  implements: () => [PublicObject],
})
@Entity()
export class Bar extends PublicObject<BarId> {
  @Field()
  @Column({ type: 'text' })
  text: string;

  @Field(() => Foo)
  @ManyToOne(() => Foo, (foo) => foo.bars, { lazy: true })
  foo: Promise<Foo>;
}
