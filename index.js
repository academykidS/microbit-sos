const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Credenciales Twilio
console.log("TWILIO ACCOUNT SID EN USO:", process.env.TWILIO_ACCOUNT_SID);

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// 🟢 Endpoint principal
app.post("/sendSOS", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    console.log("Coordenadas recibidas:", latitude, longitude);

    // 📍 Link Google Maps
    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // 📲 Envío WhatsApp Sandbox
    const message = await client.messages.create({
      from: "whatsapp:+14155238886", // Sandbox oficial Twilio
      to: "whatsapp:+18324195763", // ⚠️ CAMBIA si deseas
      body: `🚨 SOS ACTIVADO\n\nUbicación:\n${mapLink}`
    });

    console.log("SID generado:", message.sid);

    res.json({
      success: true,
      sid: message.sid
    });

  } catch (error) {
    console.error("ERROR COMPLETO TWILIO:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 🟢 Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend SOS activo");
});

// 🟢 Puerto
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
