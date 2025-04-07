import { db } from './firebaseConfig.js';

// adminPanel.js

// Set class mode (online or face-to-face)
async function setClassMode(mode) {
  await db.collection("settings").doc("class_mode").set({ mode });
  document.getElementById("modeStatus").innerText = `Class mode set to: ${mode}`;
}

// OTP generation
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP to students
async function sendOtpToStudents() {
  const otp = generateOtp();
  const date = new Date().toLocaleDateString();
  await db.collection("otps").doc(date).set({ otp, createdAt: firebase.firestore.Timestamp.now() });

  const studentEmails = [
    "student1@example.com",
    "student2@example.com"
  ];

  for (const email of studentEmails) {
    // Use your email sending service like EmailJS or Firebase functions here
    await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      to_email: email,
      message: `Your OTP for today's class is ${otp}`
    });
  }

  document.getElementById("otpStatus").innerText = `OTP sent: ${otp}`;
}

async function downloadAttendanceCSV() {
  const attendanceData = [];
  const snapshot = await db.collection("attendance").get();

  snapshot.forEach(doc => {
    attendanceData.push({ id: doc.id, ...doc.data() });
  });

  if (attendanceData.length === 0) {
    document.getElementById("csvStatus").innerText = "No attendance data available.";
    return;
  }

  const csvContent = "data:text/csv;charset=utf-8," +
    ["ID,Student,Timestamp"].join(",") + "\n" +
    attendanceData.map(row => `${row.id},${row.student || "N/A"},${row.timestamp || "N/A"}`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "attendance_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  document.getElementById("csvStatus").innerText = "CSV downloaded successfully.";
}
