const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post("/sendSOS", async (req, res) => {
  const { latitude, longitude } = req.body;

  const message = ` ALERTA SOS 
Ubicación:
https://maps.google.com/?q=${latitude},${longitude}`;

  try {
    await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886", // Número Sandbox Twilio
      to: `whatsapp:${process.env.DESTINATION_PHONE}`
    });

    res.status(200).send("WhatsApp enviado");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});