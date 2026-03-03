const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 10000;

// Ruta principal (solo para probar en navegador)
app.get("/", (req, res) => {
  res.send("Servidor activo 🚀");
});

// Ruta para recibir SOS desde tu app MIT
app.post("/sos", (req, res) => {
  console.log("=================================");
  console.log("Recibí solicitud SOS");
  console.log("Body recibido:", req.body);
  console.log("=================================");

  // Respuesta de prueba SIN Twilio
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log("=================================");
  console.log("Servidor corriendo en puerto", PORT);
  console.log("=================================");
});
