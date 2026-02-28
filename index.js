const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post("/sendSOS", async (req, res) => {
  try {

    await client.messages.create({
      from: "whatsapp:+14155238886",   // Twilio Sandbox number
      to: "whatsapp:+18324195763",     // YOUR number
      body: "🚨 SOS ALERT! The button was pressed."
    });

    res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.listen(process.env.PORT || 3000);
