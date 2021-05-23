from flask import Flask, request, jsonify
import util
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/get_features', methods=['GET'])
def get_features():
    response = jsonify({
        'InternetServices': util.get_InternetService(),
        'Contracts': util.get_Contract(),
        'PaymentMethods': util.get_PaymentMethod()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/predict_churn', methods=['GET', 'POST'])
def predict_churn():
    gender = int(request.form['gender'])
    seniorcitizen = int(request.form['seniorcitizen'])
    partner = int(request.form['partner'])
    dependents = int(request.form['dependents'])
    tenure = int(request.form['tenure'])
    phoneservice = int(request.form['phoneservice'])
    multiplelines = int(request.form['multiplelines'])
    internetservice = request.form['internetservice']
    contract = request.form['contract']
    paperlessbilling = int(request.form['paperlessbilling'])
    paymentmethod = request.form['paymentmethod']
    monthlycharges = float(request.form['monthlycharges'])
    totalcharges = float(request.form['totalcharges'])

    response = jsonify({
        'estimated_churn': util.get_chrn_value(gender, seniorcitizen, partner, dependents, tenure, phoneservice, multiplelines, internetservice, contract,
                                                  paperlessbilling, paymentmethod, monthlycharges, totalcharges)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Churn Prediction...")
    util.load_saved_artifacts()
    app.run(host = "127.0.0.1", port=8080)



