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

// 🟢 Ruta prueba
app.get("/", (req, res) => {
  res.send("Backend SOS activo");
});

// 🚨 Endpoint SOS
app.post("/sendSOS", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    console.log("Ubicación:", latitude, longitude);

    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    const message = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+1TU_NUMERO_AQUI", // ⚠️ cambia al número +1
      body: `🚨 SOS ACTIVADO\n\nUbicación:\n${mapLink}`
    });

    console.log("SID:", message.sid);

    res.json({
      success: true,
      sid: message.sid
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
