import { NotFoundException } from '@nestjs/common';
import {
  EntityManager,
  EntityTarget,
  FindOneOptions,
  SelectQueryBuilder,
} from 'typeorm';
import {
  addToQueryBuilder,
  Collection,
  CollectionCommonInput,
} from '../collection/collection-common.input';
import { PublicObject } from './public-object.base';

export abstract class PublicObjectService<
  TEntity extends PublicObject<TEntityId>,
  TEntityId extends string,
> {
  constructor(
    protected readonly target: EntityTarget<TEntity>,
    protected readonly entitySelector: string,
  ) {}

  async findAll(
    em: EntityManager,
    input: CollectionCommonInput,
  ): Promise<Collection<TEntity>> {
    return this.qb_findAll(em, input).getMany();
  }

  qb_findAll(
    em: EntityManager,
    input: CollectionCommonInput,
  ): SelectQueryBuilder<TEntity> {
    const repository = em.getRepository(this.target);
    return addToQueryBuilder<TEntity>(
      repository.createQueryBuilder(this.entitySelector),
      input,
    );
  }

  findOne(em: EntityManager, id: TEntityId): Promise<TEntity> {
    return em.findOne<TEntity>(this.target, id);
  }

  async deactivate(em: EntityManager, id: TEntityId): Promise<TEntity> {
    const entity = await this.ensureExistsOrThrow(em, id);
    if (entity.life.deactivatedAt) {
      return entity;
    }
    entity.life.deactivatedAt = new Date();
    return em.save<TEntity>(entity);
  }

  async ensureExistsOrThrow(
    em: EntityManager,
    id: TEntityId,
    options?: FindOneOptions<TEntity>,
  ): Promise<TEntity> {
    const _entity = await em.findOne<TEntity>(this.target, id, options);
    if (!_entity) {
      throw new NotFoundException(
        `The ${this.entitySelector} with the given id does not exist.`,
      );
    }

    return _entity;
  }

  protected select(em: EntityManager): SelectQueryBuilder<TEntity> {
    return em.createQueryBuilder<TEntity>(this.target, this.entitySelector);
  }
}
