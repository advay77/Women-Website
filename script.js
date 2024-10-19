
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener ('click', function (e) {
        e.preventDefault();

        document.querySelector (this.getAttribute('href')).scrollIntoView({ behavior: 'smooth'
            
        });
    });
});

// script.js

// Function to validate the contact form
function validateForm(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the input fields
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const message = document.getElementById("message").value;

    // Simple validation
    if (email === "" || firstName === "" || lastName === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Optionally validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const submissionMessage = document.getElementById("submission-message");
    submissionMessage.style.display = "block";
    submissionMessage.innerHTML = "Thank you for your message! We will get back to you soon.";

    document.querySelector(".contact-form").reset();
}


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    form.addEventListener("submit", validateForm);
});




// JavaScript to handle form submission
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.contact-form');
    const submissionMessage = document.getElementById('submission-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Display the success message
        submissionMessage.textContent = 'Form submitted successfully!';
        submissionMessage.style.display = 'block';

        // Clear the form inputs
        form.reset();

        // Optional: Hide the message after a few seconds
        setTimeout(function() {
            submissionMessage.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    });
});

// Select elements from the DOM
const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');
const recordingStatus = document.getElementById('recordingStatus');

let mediaRecorder;
let audioChunks = [];

// Request microphone access and start recording
startButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstart = () => {
            recordingStatus.innerText = "Recording...";
            startButton.disabled = true;
            stopButton.disabled = false;
        };

        mediaRecorder.start();
    } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Microphone access is required to record audio.');
    }
});

// Stop recording and save the file
stopButton.addEventListener('click', () => {
    mediaRecorder.stop();

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = audioUrl;
        downloadLink.download = 'recording.wav';
        downloadLink.click();

        audioChunks = [];
        recordingStatus.innerText = "Not recording";
        startButton.disabled = false;
        stopButton.disabled = true;
    };
});


document.getElementById("chatbot-icon").addEventListener("click", () => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.classList.toggle("active");
});

document.getElementById("send-btn").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value;
    if (userInput) {
        addMessage(userInput, "user-message");
        document.getElementById("user-input").value = "";
        handleUserMessage(userInput);
    }
});

function addMessage(message, className) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${className}`;
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;  
}

function addMessage(message, className) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = className;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; 
}
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const formData = {
            name: name,
            email: email,
            message: message
        };

        fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                alert("Your message has been sent successfully!");
                contactForm.reset();
            } else {
                alert("There was an error sending your message. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error sending your message. Please try again.");
        });
    });
});

document.getElementById("chatbot-icon").addEventListener("click", () => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.style.display = chatContainer.style.display === "none" || chatContainer.style.display === "" ? "flex" : "none";
});

document.getElementById("send-btn").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value;
    if (userInput) {
        addMessage(userInput, "user-message");
        document.getElementById("user-input").value = ""; 
        handleUserMessage(userInput);
    }
});

function addMessage(message, className) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${className}`;
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; 
}

function handleUserMessage(message) {
    const botResponse = getBotResponse(message);
    addMessage(botResponse, "bot-message");
}



function getBotResponse(userInput) {
    userInput = userInput.toLowerCase().trim(); // Normalize user input
    const keywords = [
        { patterns: ["hello", "hi", "hey"], response: "Hello! How can I assist you today?" },
        { patterns: ["help", "support", "assist"], response: "Sure! Please specify what kind of help you need." },
        { patterns: ["thank", "thanks"], response: "You're welcome! Anything else I can assist you with?" },
        { patterns: ["bye", "goodbye"], response: "Goodbye! Have a wonderful day!" },
        { patterns: ["weather"], response: "I can't check the weather right now, but you can use weather websites or apps like Weather.com." },
        { patterns: ["what is your name", "who are you"], response: "I am your friendly chatbot! Here to assist you with your questions." },
        { patterns: ["time"], response: `The current time is ${new Date().toLocaleTimeString()}.` },
        { patterns: ["date"], response: `Today's date is ${new Date().toLocaleDateString()}.` },
        { patterns: ["location", "tell my location"], response:" your location is  latitude : 28.7041 , longitude : 77.1025" },
        { patterns: ["women-health","tell some health tips for women"], response: " Stay Hydrated, Eat a Balanced Diet, Regular Exercise"},
    ];

    for (let keyword of keywords) {
        for (let pattern of keyword.patterns) {
            if (userInput.includes(pattern)) {
                return keyword.response;
            }
        }
    }

    // Fallback response for unknown queries
    return "I'm not sure how to respond to that. Can you ask something else?";
}

// Function to toggle the chatbot container
document.getElementById("chatbot-icon").addEventListener("click", function() {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.classList.toggle("active"); // Toggle the 'active' class
});

// Toggle chatbot container when the icon is clicked
document.getElementById("chatbot-icon").addEventListener("click", function() {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.classList.toggle("active"); // Toggle the 'active' class
});
