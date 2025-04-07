import { db } from './firebaseConfig.js';
import { sendOtpEmail } from './emailService';

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpToStudents() {
  const otp = generateOtp();
  const date = new Date().toLocaleDateString();
  await db.collection("otps").doc(date).set({ otp, createdAt: firebase.firestore.Timestamp.now() });

  const studentEmails = [
    "student1@example.com",
    "student2@example.com"
  ];

  for (const email of studentEmails) {
    await sendOtpEmail(email, otp);
  }

  document.getElementById("otpStatus").innerText = `OTP sent: ${otp}`;
}
