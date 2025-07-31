import User from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET;


export const createUser = async (req, res) => {
  try {
    const { name, lastname, dni, username, email, password } = req.body;

    // Validar campos requeridos
    if (!name || !lastname || !dni || !username || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Convertir DNI a número y validar
    const parsedDNI = Number(dni);
    if (isNaN(parsedDNI)) {
      return res.status(400).json({ message: "DNI inválido" });
    }

    // Verificar email duplicado
    const emailExistente = await User.findOne({ email });
    if (emailExistente) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Verificar DNI duplicado
    const dniExistente = await User.findOne({ dni: parsedDNI });
    if (dniExistente) {
      return res.status(400).json({ message: "El DNI ya está registrado" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario nuevo con datos validados y password hasheado
    const nuevoUsuario = new User({
      name,
      lastname,
      dni: parsedDNI,
      username,
      email,
      password: hashedPassword
    });

    const usuarioGuardado = await nuevoUsuario.save();

    // Eliminar password del objeto que se va a devolver
    const { password: _, ...userSinPassword } = usuarioGuardado.toObject();

    console.log("Usuario creado:", userSinPassword);
    return res.status(201).json(userSinPassword);

  } catch (error) {
    console.error("Error en createUser:", error);

    // Si es error de índice único duplicado, capturarlo y devolver mensaje claro
    if (error.code === 11000) {
      const campoDuplicado = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `El ${campoDuplicado} ya está registrado` });
    }

    return res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      secretKey,
      { expiresIn: '1h' }
    );

    const { password: _, ...userSinPassword } = user.toObject();
    res.status(200).json({ token, usuario: userSinPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /users — Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /users/:id — Obtener un usuario por id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const { password, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /users/:id — Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { password, ...resto } = req.body;
    const actualizaciones = { ...resto };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      actualizaciones.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      actualizaciones,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const { password: _, ...userSinPassword } = updatedUser.toObject();
    res.json(userSinPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /users/:id — Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id); // cambio aquí
    if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
