import { useState } from "react";

function Goals({
  salary,
  totalExpense,
  emi,
  savings,
  topExpense
}) {

  console.log(topExpense);

const [houseGoal, setHouseGoal] = useState(0);
const [carGoal, setCarGoal] = useState(0);
const [travelGoal, setTravelGoal] = useState(0);

const [targetYears, setTargetYears] = useState(0);

const [houseResult, setHouseResult] = useState("");
const [carResult, setCarResult] = useState("");
const [travelResult, setTravelResult] = useState("");

const [prediction, setPrediction] = useState("");
const [advice, setAdvice] = useState("");

const predictGoal = async () => {

try {

  const response = await fetch(
    "http://127.0.0.1:5000/predict",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        salary: salary,
        expenses: totalExpense,
        emi: emi,
        savings: savings,
        goalAmount: houseGoal,
        years: targetYears
      })
    }
  );

  const data = await response.json();

  console.log("ML Prediction:", data);

} catch (error) {

  console.log(error);

}

};

const calculateGoals = () => {

if (targetYears <= 0) {
  alert("Please enter target years");
  return;
}

const months = targetYears * 12;

const houseSavings = houseGoal / months;
const carSavings = carGoal / months;
const travelSavings = travelGoal / months;

setHouseResult(
  `You must save ₹${houseSavings.toFixed(
    0
  )} per month to buy the house in ${targetYears} years`
);

setCarResult(
  `You must save ₹${carSavings.toFixed(
    0
  )} per month to buy the car in ${targetYears} years`
);

setTravelResult(
  `You must save ₹${travelSavings.toFixed(
    0
  )} per month for your travel goal in ${targetYears} years`
);


if (savings >= houseSavings) {

  setPrediction(
    `✅ Goal Achievable`
  );

  setAdvice(
    `Current Monthly Savings: ₹${savings.toFixed(0)}


Required Monthly Savings: ₹${houseSavings.toFixed(0)}

You can comfortably achieve this goal with your current savings rate.

Recommendation:
• Continue saving regularly
• Avoid unnecessary new EMIs
• Invest surplus savings for faster growth`
);


} else {

  const gap = houseSavings - savings;

  setPrediction(
    `❌ Goal Difficult`
  );

  setAdvice(
    `Current Monthly Savings: ₹${savings.toFixed(0)}


Required Monthly Savings: ₹${houseSavings.toFixed(0)}

Additional Savings Needed: ₹${gap.toFixed(0)}

Suggested Action Plan:

• Reduce non-essential expenses

• Increase monthly income through freelancing, tutoring or side work

• Avoid taking new loans

• Save bonuses and salary increments

• Consider extending the goal timeline

If you improve your monthly savings by ₹${gap.toFixed(0)}, the goal becomes achievable.`
);


}

predictGoal();


};

return ( <div className="dashboard">

  <h2>Dreams & Goals Planner</h2>

  <input
    type="number"
    placeholder="House Goal Amount"
    onChange={(e) =>
      setHouseGoal(Number(e.target.value))
    }
  />

  <input
    type="number"
    placeholder="Car Goal Amount"
    onChange={(e) =>
      setCarGoal(Number(e.target.value))
    }
  />

  <input
    type="number"
    placeholder="Travel Goal Amount"
    onChange={(e) =>
      setTravelGoal(Number(e.target.value))
    }
  />

  <input
    type="number"
    placeholder="Target Years"
    onChange={(e) =>
      setTargetYears(Number(e.target.value))
    }
  />

  <br />
  <br />

  <button onClick={calculateGoals}>
    Calculate Goals
  </button>

  <div className="card">
    <h3>House Goal</h3>
    <p>{houseResult}</p>
  </div>

  <div className="card">
    <h3>Car Goal</h3>
    <p>{carResult}</p>
  </div>

  <div className="card">
    <h3>Travel Goal</h3>
    <p>{travelResult}</p>
  </div>

  <div className="card">
    <h3>Goal Status</h3>
    <p>{prediction}</p>
  </div>

  <div className="card">
    <h3>AI Financial Advisor</h3>
    <p style={{ whiteSpace: "pre-line" }}>
      {advice}
    </p>
  </div>

</div>


);
}

export default Goals;
