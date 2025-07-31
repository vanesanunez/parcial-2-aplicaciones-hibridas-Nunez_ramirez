

// import Report from "../models/reportsModel.js";

// // Crear reporte (requiere token)
// export const createReporte = async (req, res) => {
//   const { title, description, location, tags, locationPoint = [] } = req.body;
//   const userId = req.user.id;

//   if (!title || !description || !location || !tags) {
//     return res.status(400).json({ message: "Todos los campos obligatorios" });
//   }

//   try {
//     const nuevoReporte = new Report({
//       title,
//       description,
//       location,
//       tags,
//       userId,
//       locationPoint,
//       image: req.file ? `/uploads/${req.file.filename}` : undefined 
//     });

//     const savedReport = await nuevoReporte.save();
//     res.status(201).json(savedReport);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Obtener todos los reportes 
// export const getReportes = async (req, res) => {
//   try {
//     const reports = await Report.find();
//     res.json(reports);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Obtener reporte por id
// export const getReporteById = async (req, res) => {
//   try {
//     const report = await Report.findById(req.params.id);
//     if (!report) return res.status(404).json({ message: "Reporte no encontrado" });
//     res.json(report);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const searchByTag = async (req, res) => {
//   try {
//     const tags = req.query.tags;

//     if (!tags || tags.length === 0) {
//       return res.status(400).json({ error: "No se proporcionaron tags para buscar" });
//     }

//     const tagsArray = Array.isArray(tags) ? tags : [tags];

//     const reportes = await Report.find({ tags: { $in: tagsArray } });

//     res.json(reportes);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const updateReporte = async (req, res) => {
//   try {
//     const reportId = req.params.id;
//     // const userId = req.user.id; // Ya no hace falta

//     const report = await Report.findById(reportId);
//     if (!report) return res.status(404).json({ message: "Reporte no encontrado" });


//     const updatedReport = await Report.findByIdAndUpdate(reportId, req.body, { new: true });

//     res.json(updatedReport);
//   } catch (error) {
//     console.error("Error actualizando reporte:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export const deleteReporte = async (req, res) => {
//   try {
//     const reportId = req.params.id;

//     const report = await Report.findById(reportId);
//     if (!report) return res.status(404).json({ message: "Reporte no encontrado" });

//     await Report.findByIdAndDelete(reportId);

//     res.json({ message: "Reporte eliminado con éxito" });
//   } catch (error) {
//     console.error("Error eliminando reporte:", error);
//     res.status(500).json({ error: error.message });
//   }
// };



// //Nuevo método para búsqueda 
// // Buscar reportes por título
// export const searchByTitle = async (req, res) => {
//   try {
//     const { title } = req.query;
//     if (!title) return res.status(400).json({ error: "No se proporcionó title para buscar" });

//     const regex = new RegExp(title, "i"); // búsqueda case-insensitive
//     const reportes = await Report.find({ title: regex });

//     res.json(reportes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


import Report from "../models/reportsModel.js";
import fs from "fs";
import path from "path";

// Crear reporte (requiere token)
export const createReporte = async (req, res) => {
  try {
    const { title, description, location, tags, locationPoint = [] } = req.body;
    const userId = req.user.id;

    if (!title || !description || !location || !tags) {
      return res.status(400).json({ message: "Todos los campos obligatorios" });
    }

    // Si tags viene como string (ej: '[ "robo", "bicicleta" ]'), parsearlo
    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;

    const nuevoReporte = new Report({
      title,
      description,
      location,
      tags: parsedTags,
      userId,
      locationPoint,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    const savedReport = await nuevoReporte.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los reportes
export const getReportes = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener reporte por ID
export const getReporteById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Reporte no encontrado" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar reportes por tag
export const searchByTag = async (req, res) => {
  try {
    const tags = req.query.tags;
    if (!tags || tags.length === 0) {
      return res.status(400).json({ error: "No se proporcionaron tags para buscar" });
    }

    const tagsArray = Array.isArray(tags) ? tags : [tags];
    const reportes = await Report.find({ tags: { $in: tagsArray } });

    res.json(reportes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar reporte
export const updateReporte = async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await Report.findById(reportId);
    if (!report) return res.status(404).json({ message: "Reporte no encontrado" });

    // Actualizar campos
    const updatedFields = {
      title: req.body.title || report.title,
      description: req.body.description || report.description,
      location: req.body.location || report.location,
    };

    // Parsear tags si vienen como string
    if (req.body.tags) {
      updatedFields.tags =
        typeof req.body.tags === "string" ? JSON.parse(req.body.tags) : req.body.tags;
    }

    // Si hay nueva imagen, guardar y borrar la anterior
    if (req.file) {
      // Eliminar imagen anterior si existía
      if (report.image) {
        const imagePath = path.join(process.cwd(), report.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      updatedFields.image = `/uploads/${req.file.filename}`;
    }

    const updatedReport = await Report.findByIdAndUpdate(reportId, updatedFields, {
      new: true,
    });

    res.json(updatedReport);
  } catch (error) {
    console.error("Error actualizando reporte:", error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar reporte
export const deleteReporte = async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await Report.findById(reportId);
    if (!report) return res.status(404).json({ message: "Reporte no encontrado" });

    // Eliminar imagen si existe
    if (report.image) {
      const imagePath = path.join(process.cwd(), report.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Report.findByIdAndDelete(reportId);
    res.json({ message: "Reporte eliminado con éxito" });
  } catch (error) {
    console.error("Error eliminando reporte:", error);
    res.status(500).json({ error: error.message });
  }
};

// Buscar reportes por título
export const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) return res.status(400).json({ error: "No se proporcionó title para buscar" });

    const regex = new RegExp(title, "i"); // búsqueda case-insensitive
    const reportes = await Report.find({ title: regex });

    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
