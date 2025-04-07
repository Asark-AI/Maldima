import { db } from './firebaseConfig.js';

async function saveStudent() {
  const name = document.getElementById("studentName").value;
  const email = document.getElementById("studentEmail").value;

  const scanDoc = await db.collection("scan_results").doc("current").get();
  const data = scanDoc.data();

  if (!data || (!data.rfid && !data.fingerprint)) {
    document.getElementById("registrationStatus").innerText = "Scan data not available";
    return;
  }

  await db.collection("students").doc(email).set({
    name, email, rfid: data.rfid || "", fingerprint: data.fingerprint || ""
  });

  document.getElementById("registrationStatus").innerText = "✅ Student registered";
}
