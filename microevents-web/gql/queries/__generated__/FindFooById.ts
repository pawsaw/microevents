/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindFooById
// ====================================================

export interface FindFooById_foo_life {
  __typename: "Life";
  createdAt: any;
  updateAt: any | null;
  deactivatedAt: any | null;
}

export interface FindFooById_foo_bars {
  __typename: "Bar";
  id: string;
  text: string;
}

export interface FindFooById_foo {
  __typename: "Foo";
  id: string;
  life: FindFooById_foo_life;
  text: string;
  bars: FindFooById_foo_bars[];
}

export interface FindFooById {
  foo: FindFooById_foo;
}

export interface FindFooByIdVariables {
  id: string;
}
