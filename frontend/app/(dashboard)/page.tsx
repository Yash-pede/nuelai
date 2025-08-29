import { KpiCards } from "./components/kpi-cards";
import { StockVsDemandChart } from "@/components/stockVsDemandChart";
import ProductsTable from "@/components/products/products";

const App = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <KpiCards />
      <div className="px-4 lg:px-6">
        <StockVsDemandChart />
        <ProductsTable />
      </div>
    </div>
  );
};

export default App;
