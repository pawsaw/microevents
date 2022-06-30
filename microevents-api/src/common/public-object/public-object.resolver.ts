import { Type } from '@nestjs/common';
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { CollectionCommonInput } from '../collection/collection-common.input';
import { PublicObject } from './public-object.base';
import { PublicObjectService } from './public-object.service';

export interface PublicObjectResolverOptions {
  findAll: string;
  findOne: string;
  deactivate: string;
}

export interface PublicObjectResolverBase<
  TEntity extends PublicObject<TEntityId>,
  TEntityId extends string,
  TEntityService extends PublicObjectService<TEntity, TEntityId>,
> {
  readonly entityService: TEntityService;

  findAll(common: CollectionCommonInput, em: EntityManager): Promise<TEntity[]>;
  findOne(id: TEntityId, em: EntityManager): Promise<TEntity>;
  deactivate(id: TEntityId, em: EntityManager): Promise<TEntity>;
}

export interface PublicObjectResolverBaseClazz<
  TEntity extends PublicObject<TEntityId>,
  TEntityId extends string,
  TEntityService extends PublicObjectService<TEntity, TEntityId>,
> {
  new (entityService: TEntityService): PublicObjectResolverBase<
    TEntity,
    TEntityId,
    TEntityService
  >;
}

export function PublicObjectResolver<
  TEntity extends PublicObject<TEntityId>,
  TEntityId extends string,
  TEntityService extends PublicObjectService<
    TEntity,
    TEntityId
  > = PublicObjectService<TEntity, TEntityId>,
>(
  classRef: Type<TEntity>,
  options: PublicObjectResolverOptions,
): PublicObjectResolverBaseClazz<TEntity, TEntityId, TEntityService> {
  @Resolver({ isAbstract: true })
  class BaseResolverHost
    implements PublicObjectResolverBase<TEntity, TEntityId, TEntityService>
  {
    constructor(public readonly entityService: TEntityService) {}

    @Query(() => [classRef], { name: options.findAll })
    @Transaction()
    findAll(
      @Args('common', { type: () => CollectionCommonInput })
      common: CollectionCommonInput,
      @TransactionManager() em: EntityManager,
    ): Promise<TEntity[]> {
      return this.entityService.findAll(em, common);
    }

    @Query(() => classRef, { name: options.findOne })
    @Transaction()
    findOne(
      @Args('id', { type: () => ID }) id: TEntityId,
      @TransactionManager() em: EntityManager,
    ): Promise<TEntity> {
      return this.entityService.findOne(em, id);
    }

    @Mutation(() => classRef, { name: options.deactivate })
    @Transaction()
    deactivate(
      @Args('id', { type: () => ID }) id: TEntityId,
      @TransactionManager() em: EntityManager,
    ): Promise<TEntity> {
      return this.entityService.deactivate(em, id);
    }
  }
  return BaseResolverHost;
}
