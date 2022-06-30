import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { PublicObject } from '../../common/public-object/public-object.base';

export type PeerId = string;

@ObjectType({
  implements: () => [PublicObject],
})
@Entity()
export class Peer extends PublicObject<PeerId> {
  @Field({ nullable: false })
  @Column({ nullable: false })
  username: string;
}
