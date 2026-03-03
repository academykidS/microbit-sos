const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

// ===============================
// VERIFICACIÓN AL INICIAR
// ===============================
console.log("=====================================");
console.log("TWILIO ACCOUNT SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TWILIO AUTH TOKEN:", process.env.TWILIO_AUTH_TOKEN ? "CARGADO" : "NO CARGADO");
console.log("=====================================");

// Cliente Twilio
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ===============================
// RUTA PRINCIPAL (PRUEBA EN NAVEGADOR)
// ===============================
app.get("/", (req, res) => {
  res.send("Active server 🚀");
});

// ===============================
// RUTA QUE LLAMA TU APP MIT
// ===============================
app.post("/sos", async (req, res) => {
  try {

    console.log("=====================================");
    console.log("📩 Recibí solicitud SOS desde app");
    console.log("Body:", req.body);
    console.log("=====================================");

    const fromNumber = "whatsapp:+14155238886"; // Sandbox Twilio
    const toNumber = "whatsapp:+18324195763"; // TU NUMERO EXACTO

    console.log("Intentando enviar WhatsApp...");
    console.log("FROM:", fromNumber);
    console.log("TO:", toNumber);

    const message = await client.messages.create({
      from: fromNumber,
      to: toNumber,
      body: "🚨 SOS ALERT 🚨\nThe micro:bit button was pressed."
    });

    console.log("✅ Mensaje enviado correctamente");
    console.log("SID:", message.sid);

    res.status(200).json({
      success: true,
      sid: message.sid
    });

  } catch (error) {

    console.error("❌ ERROR AL ENVIAR MENSAJE:");
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
});

// ===============================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
