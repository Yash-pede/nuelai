import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
type Warehouse {
  code: ID!
  name: String!
  city: String!
  country: String!
}

type Product {
  id: ID!
  name: String!
  sku: String!
  warehouse: String!
  stock: Int!
  demand: Int!
}

type KPI {
  date: String!
  stock: Int!
  demand: Int!
}

type Query {
  products(search: String, status: String, warehouse: String): [Product!]!
  warehouses: [Warehouse!]!
  kpis(from: String!, to: String!): [KPI!]!
}

type Mutation {
  updateDemand(id: ID!, demand: Int!): Product!
  transferStock(id: ID!, from: String!, to: String!, qty: Int!): Product!
}
`;
const warehouses = [
  {
    code: "BLR-A",
    name: "Bangalore Main",
    city: "Bangalore",
    country: "India",
  },
  { code: "PNQ-B", name: "Pune Central", city: "Pune", country: "India" },
  { code: "DEL-C", name: "Delhi Hub", city: "Delhi", country: "India" },
  { code: "MUM-D", name: "Mumbai Depot", city: "Mumbai", country: "India" },
  {
    code: "HYD-E",
    name: "Hyderabad Store",
    city: "Hyderabad",
    country: "India",
  },
  { code: "CHE-F", name: "Chennai South", city: "Chennai", country: "India" },
  { code: "KOL-G", name: "Kolkata East", city: "Kolkata", country: "India" },
  {
    code: "AHM-H",
    name: "Ahmedabad Center",
    city: "Ahmedabad",
    country: "India",
  },
  { code: "JAIP-I", name: "Jaipur North", city: "Jaipur", country: "India" },
  { code: "LKO-J", name: "Lucknow Base", city: "Lucknow", country: "India" },
];

const products = [
  {
    id: "P-1001",
    name: "12mm Hex Bolt",
    sku: "HEX-12-100",
    warehouse: "BLR-A",
    stock: 180,
    demand: 120,
  },
  {
    id: "P-1002",
    name: "Steel Washer",
    sku: "WSR-08-500",
    warehouse: "BLR-A",
    stock: 50,
    demand: 80,
  },
  {
    id: "P-1003",
    name: "M8 Nut",
    sku: "NUT-08-200",
    warehouse: "PNQ-B",
    stock: 80,
    demand: 80,
  },
  {
    id: "P-1004",
    name: "Bearing 608ZZ",
    sku: "BRG-608-50",
    warehouse: "DEL-C",
    stock: 24,
    demand: 120,
  },

  ...Array.from({ length: 96 }).map((_, i) => {
    const id = 1005 + i;
    const warehouse =
      warehouses[Math.floor(Math.random() * warehouses.length)].code;

    const productTypes = [
      "Bolt",
      "Nut",
      "Screw",
      "Washer",
      "Bearing",
      "Pin",
      "Rod",
      "Plate",
      "Clip",
      "Spring",
    ];
    const sizes = ["6mm", "8mm", "10mm", "12mm", "16mm", "20mm"];
    const materials = ["Steel", "Alloy", "Brass", "Aluminium"];

    const type = productTypes[Math.floor(Math.random() * productTypes.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];

    const name = `${size} ${material} ${type}`;
    const sku = `${type.slice(0, 3).toUpperCase()}-${size.replace("mm", "")}-${
      100 + i
    }`;

    const stock = Math.floor(Math.random() * 181) + 20;

    const demand = Math.floor(Math.random() * 251);

    return {
      id: `P-${id}`,
      name,
      sku,
      warehouse,
      stock,
      demand,
    };
  }),
];

const ProductStatus = {
  HEALTHY: "Healthy",
  LOW: "Low",
  CRITICAL: "Critical",
};

function calculateStatus(product) {
  if (product.stock > product.demand) return ProductStatus.HEALTHY;
  if (product.stock === product.demand) return ProductStatus.LOW;
  return ProductStatus.CRITICAL;
}

function generateKPIs(from, to) {
  const start = new Date(from);
  const end = new Date(to);
  const kpiData = [];

  let current = new Date(start);

  let stock = Math.floor(Math.random() * 800) + 200;
  let demand = Math.floor(Math.random() * 800) + 200;

  while (current <= end) {
    kpiData.push({
      date: current.toISOString().split("T")[0],
      stock,
      demand,
    });

    stock += Math.floor(Math.random() * 400 - 200);
    demand += Math.floor(Math.random() * 400 - 200);

    stock = Math.max(50, Math.min(stock, 2000));
    demand = Math.max(50, Math.min(demand, 2000));

    current.setDate(current.getDate() + 1);
  }

  return kpiData;
}

export default generateKPIs;

const resolvers = {
  Query: {
    products: (_, { search, status, warehouse }) => {
      let result = [...products];
      if (search) {
        const lowerSearch = search.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerSearch) ||
            p.sku.toLowerCase().includes(lowerSearch) ||
            p.id.toLowerCase().includes(lowerSearch)
        );
      }
      if (warehouse) {
        result = result.filter((p) => p.warehouse === warehouse);
      }
      if (ProductStatus[status?.toUpperCase()]) {
        result = result.filter(
          (p) => calculateStatus(p) === ProductStatus[status.toUpperCase()]
        );
      }
      return result;
    },
    warehouses: () => warehouses,
    kpis: (_, { from, to }) => generateKPIs(from, to),
  },
  Mutation: {
    updateDemand: (_, { id, demand }) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      product.demand = demand;
      return product;
    },
    transferStock: (_, { id, from, to, qty }) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      if (product.warehouse !== from)
        throw new Error("Invalid source warehouse");
      if (product.stock < qty) throw new Error("Insufficient stock");

      product.stock -= qty;

      let targetWarehouseProduct = products.find(
        (p) => p.sku === product.sku && p.warehouse === to
      );

      if (targetWarehouseProduct) {
        targetWarehouseProduct.stock += qty;
      } else {
        const newId = `P-${Math.floor(1000 + Math.random() * 9000)}`;
        products.push({ ...product, id: newId, warehouse: to, stock: qty });
      }

      return product;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server ready at: ${url}`);
