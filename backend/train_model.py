import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

data = pd.read_csv("financial_data.csv")

X = data[
    ["Salary","Expenses","EMI","Savings","GoalAmount","Years"]
]

y = data["Achieved"]

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X, y)

joblib.dump(model, "goal_model.pkl")

print("Model Trained Successfully")