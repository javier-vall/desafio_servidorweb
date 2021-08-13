const fs = require("fs");
const path = require("path");

const RUTA_CONTENEDORES = "./files";

const p1 = {
  title: "Escuadra",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};

const p2 = {
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
};

const p3 = {
  title: "Globo Terráqueo",
  price: 345.67,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
};

class Contenedor {
  constructor(filename) {
    this.filename = filename;
    this.id = 0;
    this.data = [];

    try {
      fs.mkdirSync("files");
    } catch (error) {}

    try {
      fs.readFileSync(path.join(RUTA_CONTENEDORES, this.filename), "utf-8");
    } catch (error) {
      fs.writeFileSync(
        path.join(RUTA_CONTENEDORES, this.filename),
        JSON.stringify(this.data)
      );
    }
  }

  async setId() {
    let data = await fs.promises.readFile(
      path.join(RUTA_CONTENEDORES, this.filename),
      "utf-8"
    );
    data = JSON.parse(data);
    if (data.length === 0) {
      this.id = 0;
    } else this.id = data[data.length - 1].id;
  }

  async getAll() {
    const data = await fs.promises.readFile(
      path.join(RUTA_CONTENEDORES, this.filename),
      "utf-8"
    );
    this.data = JSON.parse(data);

    console.log(this.data);
    return this.data;
  }

  async getById(id) {
    try {
      let data = await fs.promises.readFile(
        path.join(RUTA_CONTENEDORES, this.filename),
        "utf-8"
      );
      data = JSON.parse(data);

      if (data.length <= 0) throw new Error();

      console.log(data.filter((producto) => producto.id === id));
      return data.filter((producto) => producto.id === id);
    } catch (error) {
      console.log("El Arreglo está Vacio");
    }
  }

  async save(obj) {
    await this.setId();
    this.id++;
    this.data.push({
      id: this.id,
      ...obj,
    });

    try {
      await fs.promises.writeFile(
        path.join(RUTA_CONTENEDORES, this.filename),
        JSON.stringify(this.data)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    this.data = [];
    try {
      await fs.promises.writeFile(
        path.join(RUTA_CONTENEDORES, this.filename),
        JSON.stringify(this.data)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    let data = await fs.promises.readFile(
      path.join(RUTA_CONTENEDORES, this.filename),
      "utf-8"
    );
    data = JSON.parse(data);

    data = data.filter((product) => product.id !== id);
    this.data = data;

    try {
      await fs.promises.writeFile(
        path.join(RUTA_CONTENEDORES, this.filename),
        JSON.stringify(this.data)
      );
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { Contenedor };
