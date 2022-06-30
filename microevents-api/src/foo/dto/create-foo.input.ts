import { InputType, Field, ID } from '@nestjs/graphql';
import { CreateBarInput } from './create-bar.input';

@InputType()
export class CreateFooInput {
  @Field()
  text: string;

  @Field(() => [CreateBarInput])
  bars: CreateBarInput[];
}
