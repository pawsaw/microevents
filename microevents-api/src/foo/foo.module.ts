import { Module } from '@nestjs/common';
import { FooService } from './foo.service';
import { FooResolver } from './foo.resolver';
import { Foo } from './entities/foo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bar } from './entities/bar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Foo, Bar])],
  providers: [FooResolver, FooService],
})
export class FooModule {}
