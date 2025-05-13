document.addEventListener("DOMContentLoaded", function () {
  // Contact Form Submission
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // For this demo, I'll just show an alert
      alert(
        `Thank you, ${name}! Your message has been received. We'll get back to you soon.`
      );

      // Reset the form
      this.reset();
    });
});
