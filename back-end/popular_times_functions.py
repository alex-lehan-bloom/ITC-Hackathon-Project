import populartimes
import copy
from api_key import api_key


def get_places_matching_category(category, lat1, long1, lat2, long2):
    places = populartimes.get(api_key, ['bar'], (lat1, long1), (lat2, long2))
    return places




