import { gql } from '@apollo/client';

export const CREATE_FOO = gql`
  mutation CreateFoo($text: String!, $bars: [CreateBarInput!]!) {
    createFoo(createFooInput: { text: $text, bars: $bars }) {
      id
      text
      bars {
        id
        text
      }
    }
  }
`;
