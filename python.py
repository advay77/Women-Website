import os
import openai
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Initialize OpenAI with the API key from environment variables
openai.api_key = os.getenv('OPENAI_API_KEY')  # Ensure you set this environment variable

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=["POST"])
def chat():
    user_message = request.json.get('message')  # Using .get() for safety

    # Check if the message contains a request for location
    if "location" in user_message.lower():
        return send_location()  # Call the location handler directly

    # Call OpenAI API to get a response using GPT-3
    response = openai.Completion.create(
        model="text-davinci-003",  # Using GPT-3 model
        prompt=user_message,
        max_tokens=150,  # Adjust as needed for response length
        temperature=0.7,  # Control randomness of responses
    )

    # Extract the response text
    chatbot_response = response.choices[0].text.strip()
    
    return jsonify({"response": chatbot_response})

@app.route('/send-location', methods=['POST'])
def send_location():
    data = request.json
    # Process location data
    lat = data.get('latitude')
    lon = data.get('longitude')
    # Here, you would integrate the police API or emergency services
    return jsonify({"status": "success", "message": f"Location received: {lat}, {lon}. Help is on the way!"})

@app.route('/connect-police', methods=['POST'])
def connect_police():
    # Simulate connecting to the police
    return jsonify({"status": "success", "message": "Connected to the police. Emergency services are notified!"})

if __name__ == '__main__':
    app.run(debug=True)
