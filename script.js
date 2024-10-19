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

function connectToPolice() {
    // Placeholder action for connecting to local police
    addMessage("Connecting you to local police...", "bot-message");
    // Add functionality here to trigger emergency services
}
document.getElementById("chatbot-icon").addEventListener("click", () => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.classList.toggle("active");
});


