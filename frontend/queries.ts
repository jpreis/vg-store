import { gql } from "@apollo/client";

export const GET_PRODUCTS_QUERY = gql`
  query GET_PRODUCTS_QUERY($searchTerm: String!, $skip: Int = 0, $take: Int) {
    products(
      skip: $skip
      take: $take
      orderBy: { name: asc }
      where: { name: { contains: $searchTerm } }
    ) {
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
    productsCount
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query GET_PRODUCT_QUERY($id: ID!) {
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
