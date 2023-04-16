from .candidates import findCandsRoute
from django.http import JsonResponse

def get_route(request):
    place_one = request.GET['placeOne']
    place_two = request.GET['placeTwo']

    """"
    findCandsRoute returns a tuple containg tuples with two elements, 
    a tuple containing the latitute and longitude
    the name of the location
    """
    results = findCandsRoute(place_one, place_two)

    result = {}

    for data in results:
        result[data[1]] = data[0]
    
    # Return a dictonary with keys consisting of Location names and values of their 
    # latitude and longitude
    return JsonResponse(result)
