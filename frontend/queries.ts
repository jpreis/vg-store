import { gql } from "@apollo/client";

export const GET_PRODUCTS_QUERY = gql`
  query ($searchTerm: String!) {
    products(where: { name: { contains: $searchTerm } }) {
      id
      name
      description
      price
      status
      cover {
        image {
          publicUrl
        }
      }
    }
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query ($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      price
      description
      status
      cover {
        image {
          publicUrl
        }
      }
    }
  }
`;
