import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePeerInput {
  @Field()
  username: string;
}
