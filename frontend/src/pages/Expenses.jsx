import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Expenses({
  rent,
  food,
  petrol,
  groceries,
  medical,
  emi
}) {

  const data = {
    labels: [
      "Rent",
      "Food",
      "Petrol",
      "Groceries",
      "Medical",
      "EMI"
    ],
    datasets: [
  {
    data: [
      rent,
      food,
      petrol,
      groceries,
      medical,
      emi
    ],
    backgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4CAF50",
      "#9966FF",
      "#FF9F40"
    ],
    borderColor: "#fff",
    borderWidth: 2
  }
]

  };

  return (
    <div className="card">
      <h3>Expense Distribution</h3>
      <Pie data={data} />
    </div>
  );
}

export default Expenses;