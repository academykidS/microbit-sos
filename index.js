app.post("/sendSOS", async (req, res) => {
  try {
    console.log("Número destino:", "whatsapp:+5219616548050");

    const message = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5219616548050",
      body: "PRUEBA DIRECTA BACKEND"
    });

    console.log("SID:", message.sid);

    res.json({ success: true, sid: message.sid });

  } catch (error) {
    console.error("ERROR COMPLETO:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
