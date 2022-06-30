/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBarInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateFoo
// ====================================================

export interface CreateFoo_createFoo_bars {
  __typename: "Bar";
  id: string;
  text: string;
}

export interface CreateFoo_createFoo {
  __typename: "Foo";
  id: string;
  text: string;
  bars: CreateFoo_createFoo_bars[];
}

export interface CreateFoo {
  createFoo: CreateFoo_createFoo;
}

export interface CreateFooVariables {
  text: string;
  bars: CreateBarInput[];
}
