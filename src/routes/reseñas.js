import express from 'express';
import { Review } from '../models/Review.js';

export const router = express.Router();

// IMPORTANTE: Esta ruta específica debe ir ANTES que la ruta GET /
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
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la reseña' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reseña' });
  }
});
