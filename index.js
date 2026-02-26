require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Twilio
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// 🚨 Endpoint SOS
app.post("/sendSOS", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    console.log("SOS recibido:", latitude, longitude);

    // 📍 Link Google Maps
    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    const message = await client.messages.create({
      from: "whatsapp:+14155238886", // Sandbox Twilio
      to: "whatsapp:+5219616548050", // ⚠️ CAMBIA a tu número
      body: `🚨 SOS ACTIVADO\n\nUbicación:\n${mapLink}`
    });

    console.log("Mensaje enviado:", message.sid);

    res.json({
      success: true,
      sid: message.sid
    });

  } catch (error) {
    console.error("Error Twilio:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 🟢 Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
