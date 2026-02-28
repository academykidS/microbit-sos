const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

app.post("/sendSOS", async (req, res) => {
    try {

        await client.messages.create({
            from: "whatsapp:+14155238886",  // Twilio sandbox number
            to: "whatsapp:+18324195763",    // ← tu número
            body: "🚨 SOS ALERT! The button was pressed."
        });

        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
