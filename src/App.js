import "./App.css";
// import { BasicTable } from "./components/BasicTable";
// import { SortingTable } from "./components/SortingTable";
// import { FilteringTable } from "./components/FilteringTable";
import { PaginationTable } from "./components/PaginationTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <PaginationTable />
    </div>
  );
}

export default App;
