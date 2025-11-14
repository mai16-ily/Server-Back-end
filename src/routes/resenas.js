import express from 'express';
import { Review } from '../models/Review.js';

import { Game } from "../models/Game.js";

async function actualizarStatsJuego(juegoId) {
  try {
    const reseñas = await Review.find({ juegoId });

    const horasTotales = reseñas.reduce((acc, r) => acc + (r.horasJugadas || 0), 0);
    const cantidad = reseñas.length;

    const promedio =
      cantidad > 0
        ? reseñas.reduce((acc, r) => acc + (r.puntuacion || 0), 0) / cantidad
        : 0;

    await Game.findByIdAndUpdate(juegoId, {
      horasJugadas: horasTotales,
      puntuacion: promedio.toFixed(1),
      cantidadReseñas: cantidad,
    });

  } catch (error) {
    console.error("❌ Error al actualizar estadísticas del juego:", error);
  }
}


export const router = express.Router();

router.get('/juego/:juegoId', async (req, res) => {
  try {
    console.log(`📝 Buscando reseñas para juego: ${req.params.juegoId}`);
    const reseñas = await Review.find({ juegoId: req.params.juegoId });
    console.log(`✅ Se encontraron ${reseñas.length} reseñas`);
    res.json(reseñas);
  } catch (error) {
    console.error('❌ Error al obtener reseñas del juego:', error);
    res.status(500).json({ error: 'Error al obtener reseñas del juego' });
  }
});

router.get('/', async (req, res) => {
  try {
    const reseñas = await Review.find().populate('juegoId');
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reseñas' });
  }
});

router.post('/', async (req, res) => {
  console.log("🔴🔴🔴 POST /api/reseñas recibido 🔴🔴🔴");
  try {
    console.log("📥 Datos recibidos para crear reseña:", req.body);
    
    if (!req.body.juegoId) {
      console.error("❌ juegoId es requerido");
      return res.status(400).json({ error: 'juegoId es requerido' });
    }

    const nueva = new Review(req.body);
    console.log("💾 Guardando reseña...");
    const guardada = await nueva.save();
    await actualizarStatsJuego(guardada.juegoId);
    console.log("✅ Reseña guardada exitosamente:", guardada._id);
    res.status(201).json(guardada);
  } catch (error) {
    console.error("❌ Error al crear reseña:", error.message); 
    res.status(400).json({ 
      error: 'Error al crear la reseña', 
      detalles: error.message,
      stack: error.stack
    });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await actualizarStatsJuego(actualizada.juegoId);
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la reseña' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const reseña = await Review.findById(req.params.id);
    if (!reseña) return res.status(404).json({ error: "Reseña no encontrada" });
    await Review.findByIdAndDelete(req.params.id);
    await actualizarStatsJuego(reseña.juegoId);
    res.json({ mensaje: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reseña' });
  }
});
