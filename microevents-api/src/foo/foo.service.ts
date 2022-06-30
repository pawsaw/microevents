import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PublicObjectService } from '../common/public-object/public-object.service';
import { CreateFooInput as CreateFooInput } from './dto/create-foo.input';
import { Bar } from './entities/bar.entity';
// import { Bar } from './entities/bar.entity';
import { Foo, FooId } from './entities/foo.entity';

@Injectable()
export class FooService extends PublicObjectService<Foo, FooId> {
  constructor() {
    super(Foo, 'foo');
  }

  async insert(
    em: EntityManager,
    createFooInput: CreateFooInput,
  ): Promise<Foo> {
    const _foo: Foo = em.create(Foo, {
      text: createFooInput.text,
    });
    await em.save(_foo);
    _foo.bars = Promise.all(
      createFooInput.bars.map((_bar) => {
        const bar = em.create<Bar>(Bar, {
          ..._bar,
        });

        bar.foo = Promise.resolve(_foo);

        return em.save(bar);
      }),
    );
    return em.save(_foo);
  }
}
