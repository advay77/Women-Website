from django.http import JsonResponse
import requests

def home(request):
    return JsonResponse({"message": " Running on Localhost"})

def find_police_stations(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    api_key = 'AIzaSyAUHGIIISpb2DdPZF57rZMemE1NEZfzbFc'
    endpoint = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lon}&radius=2000&type=police&key={api_key}'
    response = requests.get(endpoint)
    return JsonResponse(response.json())
