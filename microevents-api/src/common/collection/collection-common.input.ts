import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { SelectQueryBuilder } from 'typeorm';
import { PublicObject } from '../public-object/public-object.base';
import { CollectionRangeInput } from './collection-range.input';

export declare type Collection<T> = T[];

export enum Active {
  active = 'active',
  inactive = 'inactive',
  both = 'both',
}

registerEnumType(Active, {
  name: 'Active',
});

export enum OrderBy {
  created_at = 'created_at',
  deactivated_at = 'deactivated_at',
}

registerEnumType(OrderBy, {
  name: 'OrderBy',
});

export enum OrderByDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderByDirection, {
  name: 'OrderByDirection',
});

export enum OrderByNulls {
  NULLS_FIRST = 'NULLS FIRST',
  NULLS_LAST = 'NULLS LAST',
}

registerEnumType(OrderByNulls, {
  name: 'OrderByNulls',
});

@InputType()
export class CollectionCommonInput {
  @Field(() => Active, { nullable: true })
  active?: Active;

  @Field(() => CollectionRangeInput, { nullable: true })
  range?: CollectionRangeInput;

  @Field(() => OrderBy, { nullable: true, defaultValue: OrderBy.created_at })
  orderBy: OrderBy;

  @Field(() => OrderByDirection, {
    nullable: true,
    defaultValue: OrderByDirection.DESC,
  })
  orderByDirection: OrderByDirection;

  @Field(() => OrderByNulls, {
    nullable: true,
    defaultValue: OrderByNulls.NULLS_FIRST,
  })
  orderByNulls: OrderByNulls; // this has no effect on 'created_at' but make sense for 'deactivated_at'
}

export function addToQueryBuilder<TEntity extends PublicObject<string>>(
  qb: SelectQueryBuilder<TEntity>,
  input: CollectionCommonInput,
): SelectQueryBuilder<TEntity> {
  let result = qb.skip(input?.range?.skip).take(input?.range?.take);

  if (input?.active === Active.active) {
    result = result.where(`${qb.alias}.deactivated_at IS NULL`);
  } else if (input?.active === Active.inactive) {
    result = result.where(`${qb.alias}.deactivated_at IS NOT NULL`);
  }

  result = result.orderBy(
    `${qb.alias}.${input.orderBy}`,
    input.orderByDirection,
    input.orderByNulls,
  );

  return result;
}
