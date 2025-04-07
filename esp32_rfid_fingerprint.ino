#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <MFRC522.h>
#include <Adafruit_Fingerprint.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>

#define RST_PIN 22
#define SS_PIN  21
#define OLED_RESET -1

Adafruit_SSD1306 display(128, 64, &Wire, OLED_RESET);
MFRC522 mfrc522(SS_PIN, RST_PIN);
HardwareSerial mySerial(2);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

// Firebase config
#define API_KEY "AIzaSyCp_ZmwFwfP8S472HemWs62h0Icby2Rg_c"
#define DATABASE_URL "https://smart-a-f0600-default-rtdb.firebaseio.com"
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

String wifi_ssid = "Replace_with_actual_SSID";
String wifi_pass = "Replace_with_actual_password";

void setup() {
  Serial.begin(115200);
  SPI.begin();
  mfrc522.PCD_Init();
  finger.begin(57600);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.display();

  WiFi.begin(wifi_ssid, wifi_pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  String mode;
  if (Firebase.RTDB.getString(&fbdo, "/settings/class_mode")) {
    mode = fbdo.stringData();
  }

  if (mode == "face_to_face") {
    scanRFID();
    scanFingerprint();
  }

  delay(2000);
}

void scanRFID() {
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) return;
  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();

  Firebase.RTDB.setString(&fbdo, "/scan_results/current/rfid", uid);
  Firebase.RTDB.setString(&fbdo, "/attendance/" + String(millis()), uid);
  displayMessage("RFID scanned!");
}

void scanFingerprint() {
  if (finger.getImage() != FINGERPRINT_OK) return;
  if (finger.image2Tz() != FINGERPRINT_OK) return;
  if (finger.fingerSearch() != FINGERPRINT_OK) return;

  int id = finger.fingerID;
  Firebase.RTDB.setString(&fbdo, "/scan_results/current/fingerprint", String(id));
  Firebase.RTDB.setString(&fbdo, "/attendance/" + String(millis()), String(id));
  displayMessage("Fingerprint scanned!");
}

void displayMessage(String msg) {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 10);
  display.println(msg);
  display.display();
}