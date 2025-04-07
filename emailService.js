// emailService.js

// Initialize EmailJS
emailjs.init("Replace_with_actual_user_id");

// Function to send an OTP email
function sendOtpEmail(toEmail, otp) {
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    to_email: toEmail,
    message: `Your OTP for today's class is ${otp}`
  })
  .then(function(response) {
    console.log('OTP sent successfully!', response);
  }, function(error) {
    console.error('Error sending OTP:', error);
  });
}
