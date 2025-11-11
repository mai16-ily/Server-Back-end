import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  _id: ObjectId,
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  plataforma: { type: String, required: true },
  añoLanzamiento: { type: Number, required: true },
  desarrollador: { type: String, required: true },
  imagenPortada: { type: String, required: false },
  descripcion: { type: String, required: false },
  completado: { type: Boolean, default: false },
  horasJugadas: { type: Number, default: 0 },
  puntuacion: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

export const Game = mongoose.model('Game', gameSchema);
