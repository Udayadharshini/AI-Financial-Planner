import { useState } from "react";
import Expenses from "./Expenses";

function Dashboard({
  salary,
  setSalary,
  totalExpense,
  setTotalExpense,
  emi,
  setEmi,
  savings,
  setSavings,
  topExpense,
  setTopExpense
}) {


  const [rent, setRent] = useState(0);
  const [electricity, setElectricity] = useState(0);
  const [medical, setMedical] = useState(0);
  const [monthlyGroceries, setMonthlyGroceries] = useState(0);

  const [food, setFood] = useState(0);
  const [petrol, setPetrol] = useState(0);
  const [weekendExpense, setWeekendExpense] = useState(0);

  const [score, setScore] = useState(0);
  const [advice, setAdvice] = useState("");
  const [smartAdvice, setSmartAdvice] = useState("");

  const analyze = () => {

    const monthlyFood = food * 30;
    const monthlyPetrol = petrol * 30;
    const monthlyWeekendExpense = weekendExpense * 4;

    const totalExpenses =
      rent +
      electricity +
      medical +
      monthlyGroceries +
      monthlyFood +
      monthlyPetrol +
      monthlyWeekendExpense +
      emi;

    const remaining = salary - totalExpenses;

    setTotalExpense(totalExpenses);
    setSavings(remaining);

    let healthScore = 100;

if (remaining < 0) {
  healthScore = 20;
}
else if (remaining < salary * 0.1) {
  healthScore = 40;
}
else if (remaining < salary * 0.2) {
  healthScore = 60;
}
else if (remaining < salary * 0.3) {
  healthScore = 80;
}
else {
  healthScore = 100;
}

if (emi > salary * 0.4) {
  healthScore -= 10;
}

if (healthScore < 0) {
  healthScore = 0;
}
    setScore(healthScore);

    const expenseList = [
  { name: "Rent", value: rent },
  { name: "Electricity", value: electricity },
  { name: "Medical", value: medical },
  { name: "Groceries", value: monthlyGroceries },
  { name: "Food", value: monthlyFood },
  { name: "Petrol", value: monthlyPetrol },
  { name: "Weekend", value: monthlyWeekendExpense },
  { name: "EMI", value: emi }
];

expenseList.sort((a, b) => b.value - a.value);

setTopExpense(
  `${expenseList[0].name} (₹${expenseList[0].value})`
);

if (expenseList[0].name === "Food") {
  setSmartAdvice(
    "Food expenses are high. Consider meal planning."
  );
}
else if (expenseList[0].name === "Petrol") {
  setSmartAdvice(
    "Travel expenses are high. Consider public transport or carpooling."
  );
}
else if (expenseList[0].name === "EMI") {
  setSmartAdvice(
    "Loan burden is high. Avoid taking additional loans."
  );
}
else {
  setSmartAdvice(
    "Monitor your highest expense category regularly."
  );
}


    let suggestion = "";

    if (remaining <= 0) {
      suggestion =
        "⚠ Your expenses exceed your income. Reduce spending immediately.";
    } else if (remaining < salary * 0.2) {
      suggestion =
        "⚠ Savings are below 20% of your salary. Try reducing weekend or daily expenses.";
    } else {
      suggestion =
        "Good job! Your savings rate is healthy.";
    }

    setAdvice(suggestion);
  };

  return (
    <div className="dashboard">

      <h2>AI Financial Planner</h2>

      <h3>Income</h3>

      <input
        type="number"
        placeholder="Monthly Salary"
        onChange={(e) => setSalary(Number(e.target.value))}
      />

      <h3>Monthly Expenses</h3>

      <input
        type="number"
        placeholder="House Rent"
        onChange={(e) => setRent(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Electricity Bill"
        onChange={(e) => setElectricity(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Medical Expenses"
        onChange={(e) => setMedical(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Monthly Groceries"
        onChange={(e) => setMonthlyGroceries(Number(e.target.value))}
      />

      <h3>Daily Expenses</h3>

      <input
        type="number"
        placeholder="Daily Food Expense"
        onChange={(e) => setFood(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Daily Petrol / Travel Expense"
        onChange={(e) => setPetrol(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Weekend Expense (Per Weekend)"
        onChange={(e) => setWeekendExpense(Number(e.target.value))}
      />

      <h3>Loans & EMI</h3>

      <input
        type="number"
        placeholder="Monthly EMI"
        onChange={(e) => setEmi(Number(e.target.value))}
      />

      <br />
      <br />

      <button onClick={analyze}>
        Analyze
      </button>

      <div className="card">
        <h3>Total Expenses</h3>
        <p>₹{totalExpense}</p>
      </div>

      <div className="card">
        <h3>Monthly Savings</h3>
        <p>₹{savings}</p>
      </div>

      <div className="card">
        <h3>Financial Health Score</h3>
        <p>{score}/100</p>
      </div>

      <div className="card">
  <h3>Highest Expense Category</h3>
  <p>{topExpense}</p>
</div>

<div className="card">
  <h3>Smart Insight</h3>
  <p>{smartAdvice}</p>
</div>

      <div className="card">
        <h3>AI Advice</h3>
        <p>{advice}</p>
      </div>

      <Expenses
  rent={rent}
  food={food * 30}
  petrol={petrol * 30}
  groceries={monthlyGroceries}
  medical={medical}
  emi={emi}
/>

</div>
    
  );
}

export default Dashboard;