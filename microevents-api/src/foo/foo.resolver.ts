import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FooService } from './foo.service';
import { Foo, FooId } from './entities/foo.entity';
import { CreateFooInput } from './dto/create-foo.input';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { PublicObjectResolver } from '../common/public-object/public-object.resolver';

@Resolver(() => Foo)
export class FooResolver extends PublicObjectResolver<Foo, FooId, FooService>(
  Foo,
  {
    findAll: 'foos',
    findOne: 'foo',
    deactivate: 'deactivateFoo',
  },
) {
  constructor(fooService: FooService) {
    super(fooService);
  }

  @Mutation(() => Foo)
  @Transaction()
  createFoo(
    @Args('createFooInput') upsertFooInput: CreateFooInput,
    @TransactionManager() em: EntityManager,
  ): Promise<Foo> {
    return this.entityService.insert(em, upsertFooInput);
  }
}
