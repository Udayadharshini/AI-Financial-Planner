from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load("goal_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    probability = model.predict_proba([[
        data["salary"],
        data["expenses"],
        data["emi"],
        data["savings"],
        data["goalAmount"],
        data["years"]
    ]])[0][1]

    return jsonify({
        "probability": round(probability * 100, 2)
    })

@app.route("/")
def home():
    return "ML Server Running Successfully"

@app.route("/test")
def test():

    result = model.predict([
        [50000, 35000, 5000, 10000, 1000000, 10]
    ])

    return {
        "prediction": int(result[0])
    }

app.run(debug=True)