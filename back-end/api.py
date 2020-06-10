from flask_cors import CORS
import json
from flask import Flask, request
from DatSci.Hackaton_poptimes_solver import min_pop
from mock_data import mock_data
import datetime
import datetime as dt



app = Flask(__name__)
CORS(app)

@app.route("/place")
def place_recommendation():
    content = request.args
    category = content.get('category').lower()
    sublist = []
    day_of_week = datetime.datetime.today().weekday()
    current_hour = dt.datetime.now().hour
    print(day_of_week)
    print(current_hour)
    for place in mock_data:
        if place['types'] == ["supermarket"]:
            sublist.append(place)
    recommendations = min_pop(sublist)
    # print(len(recommendations))
    response = app.response_class(response=json.dumps(recommendations), status=200, mimetype="application/json")
    return response

if __name__ == "__main__":
    app.run(debug=True)


