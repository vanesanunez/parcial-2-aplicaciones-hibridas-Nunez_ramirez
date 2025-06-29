

import Report from "../models/reportsModel.js";

// Crear reporte (requiere token)
export const createReporte = async (req, res) => {
  const { title, description, location, tags, locationPoint = [] } = req.body;
  const userId = req.user.id;

  if (!title || !description || !location || !tags) {
    return res.status(400).json({ message: "Todos los campos obligatorios" });
  }

  try {
    const nuevoReporte = new Report({
      title,
      description,
      location,
      tags,
      userId,
      locationPoint 
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

// Obtener reporte por id
export const getReporteById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Reporte no encontrado" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

export const updateReporte = async (req, res) => {
  try {
    const reportId = req.params.id;
    // const userId = req.user.id; // Ya no hace falta

    const report = await Report.findById(reportId);
    if (!report) return res.status(404).json({ message: "Reporte no encontrado" });


    const updatedReport = await Report.findByIdAndUpdate(reportId, req.body, { new: true });

    res.json(updatedReport);
  } catch (error) {
    console.error("Error actualizando reporte:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteReporte = async (req, res) => {
  try {
    const reportId = req.params.id;

    const report = await Report.findById(reportId);
    if (!report) return res.status(404).json({ message: "Reporte no encontrado" });

    await Report.findByIdAndDelete(reportId);

    res.json({ message: "Reporte eliminado con éxito" });
  } catch (error) {
    console.error("Error eliminando reporte:", error);
    res.status(500).json({ error: error.message });
  }
};



//Nuevo método para búsqueda 
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


