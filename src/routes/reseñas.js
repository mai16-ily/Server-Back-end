import express from 'express';
import { Review } from '../models/Review.js';

export const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const reseñas = await Review.find().populate('juegoId');
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reseñas' });
  }
});


router.get('/juego/:juegoId', async (req, res) => {
  try {
    const reseñas = await Review.find({ juegoId: req.params.juegoId });
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reseñas del juego' });
  }
});


router.post('/', async (req, res) => {
  try {
    const nueva = new Review(req.body);
    const guardada = await nueva.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la reseña' });
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
