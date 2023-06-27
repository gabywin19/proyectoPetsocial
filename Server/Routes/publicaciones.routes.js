const { index, create, remove, update, get,} = require("../Controllers/publicaciones.controller");
const { authenticate } = require("../Config/jwt.config");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads/"), // Ruta absoluta al directorio "uploads"
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const nombreArchivo = `${uuidv4()}${extension}`;
    cb(null, nombreArchivo);
  },
});

let imageNumber = 0

function getNextImageNumber() {
    imageNumber++
    return imageNumber.toString().padStart(4, '0') // Agrega ceros a la izquierda para tener siempre 4 dígitos
}

const upload = multer({ storage })

module.exports = (app) => {
  app.post("/api/publicaciones", authenticate, upload.single('imagen'), create);
  app.get("/api/publicaciones", authenticate, index);
  app.get("/api/publicaciones/:id", authenticate, get);
  app.delete("/api/publicaciones/:id", authenticate, remove);
  app.put("/api/publicaciones/:id", authenticate, update);
};
