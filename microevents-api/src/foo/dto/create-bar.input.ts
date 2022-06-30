import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateBarInput {
  @Field()
  text: string;
}
