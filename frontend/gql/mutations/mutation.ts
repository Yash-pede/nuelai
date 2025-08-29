import { gql } from "@apollo/client";

export const UPDATE_PRODUCT_DEMAND = gql`
  mutation UpdateProductDemand($id: ID!, $demand: Int!) {
    updateDemand(id: $id, demand: $demand) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;
