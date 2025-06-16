
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica que el header Authorization exista y tenga formato correcto
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no enviado o formato inválido" });
  }

  const token = authHeader.split(" ")[1]; // Extrae el token

  try {
    const payload = jwt.verify(token, secretKey); // Verifica y decodifica el token
    console.log("Payload del token:", payload);
    req.user = payload; // Guarda los datos del token en la request
    next(); // Pasa al siguiente middleware o controller
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

export default authenticateJWT;
