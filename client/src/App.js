import "./App.css";
import AllTransactions from "./components/AllTransactions";
import BarChart from "./components/BarChart";
import Statistics from "./components/Statistics";

function App() {
  return (
    <div className="App bg-sky-200 min-h-screen">
      <h2 className="text-center font-semibold text-2xl pt-5">
        Transaction Board
      </h2>
      <AllTransactions />

      <Statistics />

      <BarChart />
    </div>
  );
}

export default App;
