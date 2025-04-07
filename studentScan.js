import { db } from './firebaseConfig.js';

function triggerScan(type) {
  const status = document.getElementById("registrationStatus");
  status.innerText = `Please scan ${type} on device`;
  db.collection("scan_requests").doc("current").set({ type, requested: true });
}
