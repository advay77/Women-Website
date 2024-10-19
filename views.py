from django.http import JsonResponse
import requests
from twilio.rest import Client

def emergency_alert(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    contacts = ['+6386771480']  # Replace with actual emergency contact numbers

    for contact in contacts:
        send_alert(contact, lat, lon)

    return JsonResponse({'status': 'Alert sent successfully!'})

def send_alert(contact_number, lat, lon):
    account_sid = '#'
    auth_token = '#'
    client = Client(account_sid, auth_token)

    try:
        message = client.messages.create(
            body=f'User in emergency. Location: {lat},{lon}',
            from_='+15097743936',
            to=contact_number
        )
        print(f"Alert sent to {contact_number}. Message SID: {message.sid}")
    except Exception as e:
        print(f"Failed to send alert: {e}")

def find_nearby_places(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    api_key = '#'

    endpoint = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lon}&radius=2000&type=police&key={api_key}'

    try:
        response = requests.get(endpoint)
        response.raise_for_status()
        data = response.json()
        return JsonResponse(data)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=400)
