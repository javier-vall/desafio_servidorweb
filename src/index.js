const express = require("express");

const { Contenedor } = require("./contenedor");
const archivo = new Contenedor("archivo.txt");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/productos", async (req, res) => {
  const data = await archivo.getAll();
  res.status(200).json(data);
});

app.get("/productoRandom", async (req, res) => {
  const data = await archivo.getAll();
  // Math.random() * (max - min) + min;
  const random = Math.floor(Math.random() * data.length);
  res.status(200).json(data[random]);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`);
});
