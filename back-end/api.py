from flask_cors import CORS
import json
from flask import Flask, request
from DatSci.Hackaton_poptimes_solver import min_pop
from mock_data import mock_data, test_response
from DatSci.current_best_fit import current_best_fit
import datetime
import datetime as dt



app = Flask(__name__)
CORS(app)

@app.route("/place")
def test():
    response = app.response_class(response=json.dumps(test_response), status=200, mimetype="application/json")
    return response



@app.route("/place_test")
def place_recommendation():
    content = request.args
    category = content.get('category').lower()
    day_of_week = datetime.datetime.today().weekday()
    current_hour = dt.datetime.now().hour
    if day_of_week == 2:
        day_of_week == 'Wednesday'
    sublist = []
    for place in mock_data:
        if place['types'] == ["supermarket"]:
            sublist.append(place)
    # recommendations = min_pop(sublist)
    recommendations = current_best_fit(sublist, day_of_week, current_hour)
    # print(len(recommendations))
    response = app.response_class(response=json.dumps(recommendations), status=200, mimetype="application/json")
    return response

if __name__ == "__main__":
    app.run(debug=True)


