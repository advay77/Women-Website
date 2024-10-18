
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener ('click', function (e) {
        e.preventDefault();

        document.querySelector (this.getAttribute('href')).scrollIntoView({ behavior: 'smooth'
            
        });
    });
});


function validateForm(event) {
    event.preventDefault(); // Prevent the default form submission

    // input fields
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const message = document.getElementById("message").value;

    // Validation should be simple 
    if (email === "" || firstName === "" || lastName === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    // email format
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




document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector ('.contact-form');
    const submissionMessage = document.getElementById ('submission-message');

    form.addEventListener ('submit', function(event) {
        event.preventDefault();

       
        submissionMessage.textContent = 'Form submitted successfully!';
        submissionMessage.style.display = 'block';

  
        form.reset();

        setTimeout(function() {
            submissionMessage.style.display = 'none'; }, 5000); 
    });
});



