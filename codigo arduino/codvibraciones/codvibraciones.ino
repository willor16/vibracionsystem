#include <WiFi.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>
#include <FirebaseESP32.h>

// Pines de los LEDs
const int ledApagado = 16;    // LED rojo
const int ledEncendido = 17;  // LED verde
const int ledVibracion = 18;  // LED azul
const int pinInterruptor = 5; // Interruptor

const char* ssid = "S23wilmer";
const char* password = "123456789";


FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;

#define MAX_LECTURAS 700
float datos[MAX_LECTURAS];
int tiempos[MAX_LECTURAS];
int indice = 0;
bool recolectando = false;
unsigned long tiempoInicio = 0;

Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);

void parpadearLeds(int repeticiones, int delayTime) {
  for (int i = 0; i < repeticiones; i++) {
    digitalWrite(ledApagado, HIGH);
    digitalWrite(ledEncendido, HIGH);
    digitalWrite(ledVibracion, HIGH);
    delay(delayTime);
    digitalWrite(ledApagado, LOW);
    digitalWrite(ledEncendido, LOW);
    digitalWrite(ledVibracion, LOW);
    delay(delayTime);
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  pinMode(ledApagado, OUTPUT);
  pinMode(ledEncendido, OUTPUT);
  pinMode(ledVibracion, OUTPUT);
  pinMode(pinInterruptor, INPUT_PULLUP);

  Serial.println("Iniciando conexión WiFi...");
  WiFi.begin(ssid, password);

  unsigned long startTime = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startTime < 15000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✔ WiFi Conectado");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n✖ No se pudo conectar al WiFi");
    digitalWrite(ledApagado, HIGH);
    digitalWrite(ledEncendido, LOW);
    digitalWrite(ledVibracion, LOW);
    return;
  }


  config.host = "monitoreovibracion-default-rtdb.firebaseio.com";
  config.api_key = "AIzaSyAj2p3jlAfrssl_cVFCCmm0V6HQkAA2siM";
  config.time_zone = -6;

  auth.token.uid = "";
  config.signer.tokens.legacy_token = "";
  auth.user.email = "";
  auth.user.password = "";

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("✔ Autenticación anónima completada");
  } else {
    Serial.print("✖ Error de autenticación: ");
    Serial.println(config.signer.signupError.message.c_str());
  }

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  if (!Firebase.ready()) {
    Serial.print("✖ Firebase no listo: ");
    Serial.println(firebaseData.errorReason());
  } else {
    Serial.println("✔ Firebase listo");
  }

  Wire.begin(21, 22);
  if (!accel.begin()) {
    Serial.println("❌ No se detectó el ADXL345");
    while (1) delay(10);
  }
  Serial.println("✅ ADXL345 inicializado");

  parpadearLeds(4, 300);
  digitalWrite(ledApagado, HIGH);
  digitalWrite(ledEncendido, HIGH);
  digitalWrite(ledVibracion, LOW);
}

void loop() {
  int estado = digitalRead(pinInterruptor);

  if (estado == LOW && !recolectando) {
    recolectando = true;
    indice = 0;
    tiempoInicio = millis();
    digitalWrite(ledApagado, LOW);
    digitalWrite(ledVibracion, HIGH);
    Serial.println("Recolectando datos del ADXL345...");
  }

  if (recolectando && estado == LOW) {
    if (indice < MAX_LECTURAS) {
      sensors_event_t event;
      accel.getEvent(&event);

      float amplitud = sqrt(
        event.acceleration.x * event.acceleration.x +
        event.acceleration.y * event.acceleration.y +
        event.acceleration.z * event.acceleration.z
      );
      datos[indice] = amplitud;
      tiempos[indice] = millis() - tiempoInicio;
      indice++;
    }
    delay(100);
  }

  if (recolectando && estado == HIGH) {
    Serial.println("Enviando datos del ADXL345 a Firebase...");


    Firebase.deleteNode(firebaseData, "/lecturas");

    for (int i = 0; i < indice; i++) {
      String path = "/lecturas/" + String(i);
      Firebase.setFloat(firebaseData, path + "/amplitud", datos[i]);
      Firebase.setInt(firebaseData, path + "/tiempo_ms", tiempos[i]);
      Serial.print(path);
      Serial.print(" => A: ");
      Serial.print(datos[i], 3);
      Serial.print(" | T: ");
      Serial.println(tiempos[i]);
    }


    int duracionTotal = tiempos[indice - 1];
    Firebase.setInt(firebaseData, "/duracion_ms", duracionTotal);

    Serial.println("Envio completo.\n---------------------------");
    digitalWrite(ledApagado, HIGH);
    digitalWrite(ledVibracion, LOW);
    recolectando = false;
  }
} 
