import populartimes
import copy
from api_key import api_key


def get_places_matching_category(category, lat, long, lat2, long2):
    places = populartimes.get("AIzaSyBl1L1DdtZVL2tRjBRA6CcKw1Tp7pABjKQ", [category], (lat,long), (lat2,long2))
    return places




