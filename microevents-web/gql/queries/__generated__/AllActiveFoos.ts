/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllActiveFoos
// ====================================================

export interface AllActiveFoos_foos_life {
  __typename: "Life";
  createdAt: any;
  updateAt: any | null;
  deactivatedAt: any | null;
}

export interface AllActiveFoos_foos_bars {
  __typename: "Bar";
  id: string;
  text: string;
}

export interface AllActiveFoos_foos {
  __typename: "Foo";
  id: string;
  life: AllActiveFoos_foos_life;
  bars: AllActiveFoos_foos_bars[];
}

export interface AllActiveFoos {
  foos: AllActiveFoos_foos[];
}

export interface AllActiveFoosVariables {
  skip?: number | null;
  take?: number | null;
}
