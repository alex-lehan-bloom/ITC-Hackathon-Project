from flask_cors import CORS
import json
from flask import Flask, request
from DatSci.Hackaton_poptimes_solver import min_pop
from mock_data import mock_data


app = Flask(__name__)
CORS(app)

@app.route("/place")
def place_recommendation():
    content = request.args
    category = content.get('category')
    test = min_pop(mock_data)
    response = app.response_class(response=json.dumps(test), status=200, mimetype="application/json")
    return response

if __name__ == "__main__":
    app.run(debug=True)


