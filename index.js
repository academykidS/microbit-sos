const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

// 🔎 LOGS DE VERIFICACIÓN AL INICIAR
console.log("=====================================");
console.log("TWILIO ACCOUNT SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TWILIO AUTH TOKEN:", process.env.TWILIO_AUTH_TOKEN ? "CARGADO" : "NO CARGADO");
console.log("=====================================");

// Cliente Twilio
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Endpoint para enviar mensaje
app.post("/enviar", async (req, res) => {
  try {
    const fromNumber = "whatsapp:+14155238886"; // Sandbox oficial
    const toNumber = "whatsapp:+5219616548050"; // TU NÚMERO EXACTO (como aparece en Sandbox)

    console.log("Intentando enviar mensaje...");
    console.log("FROM:", fromNumber);
    console.log("TO:", toNumber);

    const message = await client.messages.create({
      from: fromNumber,
      to: toNumber,
      body: "Mensaje de prueba desde microbit 🚀"
    });

    console.log("Mensaje enviado. SID:", message.sid);

    res.status(200).json({
      success: true,
      sid: message.sid
    });

  } catch (error) {
    console.error("ERROR COMPLETO:");
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
