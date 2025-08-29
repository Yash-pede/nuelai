import { gql } from "@apollo/client";

export const GET_TOTAL_STOCK = gql`
  query GetTotalStock($from: String!, $to: String!) {
    kpis(from: $from, to: $to) {
      stock
    }
  }
`;

export const GET_TOTAL_DEMAND = gql`
  query GetTotalDemand($from: String!, $to: String!) {
    kpis(from: $from, to: $to) {
      demand
    }
  }
`;

export const GET_STOCK_AND_DEMAND = gql`
  query GET_STOCK_AND_DEMAND($from: String!, $to: String!) {
    kpis(from: $from, to: $to) {
      stock
      demand
    }
  }
`;

export const GET_STOCK_DEMAND_DATE = gql`
  query GET_STOCK_DEMAND_DATE($from: String!, $to: String!) {
    kpis(from: $from, to: $to) {
      stock
      demand
      date
    }
  }
`;

export const GET_PRODUCTS = gql`
query GetProducts($status: String, $search: String, $warehouse: String) {
  products(status: $status, search: $search, warehouse: $warehouse) {
    id
    name
    sku
    warehouse
    stock
    demand
  }
}

`;

export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      code
      name
      city
      country
    }
  }
`;
