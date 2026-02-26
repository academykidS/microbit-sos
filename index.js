const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

// Verificación básica de variables de entorno
if (
  !process.env.TWILIO_ACCOUNT_SID ||
  !process.env.TWILIO_AUTH_TOKEN ||
  !process.env.DESTINATION_PHONE
) {
  console.error("Faltan variables de entorno en Render.");
}

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Microbit SOS backend activo");
});

// Endpoint real para enviar SOS
app.post("/sendSOS", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({
      error: "Latitude y Longitude son requeridos"
    });
  }

  const message = `🚨 ALERTA SOS
Ubicación:
https://maps.google.com/?q=${latitude},${longitude}`;

  try {
    const response = await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886", // Sandbox Twilio
      to: `whatsapp:${process.env.DESTINATION_PHONE}`
    });

    res.status(200).json({
      success: true,
      sid: response.sid
    });

  } catch (error) {
    console.error("Error enviando mensaje:", error.message);
    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
Add GET endpoint
