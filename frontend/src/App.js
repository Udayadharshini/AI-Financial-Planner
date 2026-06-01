import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";

function App() {

  const [salary, setSalary] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [emi, setEmi] = useState(0);
  const [savings, setSavings] = useState(0);

  const [topExpense, setTopExpense] = useState("");

  return (
    <div>

      <Dashboard
  salary={salary}
  setSalary={setSalary}
  totalExpense={totalExpense}
  setTotalExpense={setTotalExpense}
  emi={emi}
  setEmi={setEmi}
  savings={savings}
  setSavings={setSavings}
  topExpense={topExpense}
  setTopExpense={setTopExpense}
/>

      <Goals
  salary={salary}
  totalExpense={totalExpense}
  emi={emi}
  savings={savings}
  topExpense={topExpense}
/>

    </div>
  );
}

export default App;