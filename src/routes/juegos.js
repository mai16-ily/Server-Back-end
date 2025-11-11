import express from 'express';
import { Game } from '../models/Game.js';

export const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const juegos = await Game.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los juegos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const juego = await Game.findById(req.params.id);
    res.json(juego);
  } catch (error) {
    console.error('Error al obtener los juegos:', error);
    res.status(500).json({ error: 'Error al obtener el juego' });
  }
});


router.post('/', async (req, res) => {
  try {
    const nuevoJuego = new Game(req.body);
    const guardado = await nuevoJuego.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el juego' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el juego' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Juego eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el juego' });
  }
});
