from flask_cors import CORS
import json
from flask import Flask, request
from popular_times_functions import get_places_matching_category
import copy

app = Flask(__name__)
CORS(app)

@app.route("/place")
def place_recommendation():
    content = request.args
    category = content.get('category')
    lat1 = float(content.get('latitude'))
    long1 = float(content.get('longitude'))
    lat2 = 34.772358
    long2 = 32.061921
    places = get_places_matching_category(category, lat1, long1, lat2, long2)
    response = app.response_class(response=json.dumps(places), status=200, mimetype="application/json")
    return response




if __name__ == "__main__":
    app.run(debug=True)


