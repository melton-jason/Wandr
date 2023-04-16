import googlemaps
import json
import os

gmaps = googlemaps.Client(key=os.environ['API_KEY'])

def findCandsRoute(start, end):
    candidatePoints = generateCandPoints(start, end)
    allCands = set([])
    for point in candidatePoints:
        for attraction in generateCandidates(point):
            #print(attraction)
            allCands.add(processAttraction(attraction))
    return allCands


def generateCandPoints(start, end):
    dirs = gmaps.directions(start, end, mode="driving")[0]
    #print(dirs)
    startLocs = set([])
    for leg in dirs["legs"]:
        for step in leg["steps"]:
            startLocs.add((step["start_location"]["lat"], step["start_location"]["lng"]))
    return startLocs


def generateCandidates(point, radius = 50000, price_cap = 99999):
    candidates = gmaps.places_nearby(point, keyword = "Famous attraction", radius = radius)
   # print(candidates)
    return candidates["results"]



def processAttraction(attraction):
    return ((attraction["geometry"]["location"]["lat"],attraction["geometry"]["location"]["lng"]),attraction["name"])
