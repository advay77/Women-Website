import requests
from twilio.rest import Client

def send_alert(contact_number, lat, lon):
    account_sid = '#' # account SID github didnt gave persmission to show it
    auth_token = '0b0a346129756151eb76c17ac28ff10f'
    client = Client(account_sid, auth_token)
    
    try:
        message = client.messages.create(
            body=f'User in emergency. Location: {lat},{lon}',
            from_='+15097743936',  # Ensure this is your Twilio number
            to=contact_number
        )
        print(f"Alert sent to {contact_number}. Message SID: {message.sid}")
    except Exception as e:
        print(f"Failed to send alert: {e}")

def find_nearby_places(lat, lon):
    api_key = 'AIzaSyAUHGIIISpb2DdPZF57rZMemE1NEZfzbFc'
    endpoint = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lon}&radius=2000&type=police&key={api_key}'
    
    try:
        response = requests.get(endpoint)
        response.raise_for_status()  # Raise an error for bad responses (4xx, 5xx)
        data = response.json()

        # Check if the API returned valid results
        if 'results' in data:
            print(f"Found {len(data['results'])} nearby police stations.")
            return data
        else:
            print(f"Error in Google API response: {data}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"Error fetching nearby places: {e}")
        return None

def notify_emergency_contacts(contacts, lat, lon):
    for contact in contacts:
        send_alert(contact, lat, lon)

# Example usage:
contacts = ['+916386771480']  # Replace with actual contact numbers
lat, lon = 28.7041, 77.1025  # Example coordinates
notify_emergency_contacts(contacts, lat, lon)
