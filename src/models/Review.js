import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  puntuacion: { type: Number, min: 1, max: 5, required: true },
  horasJugadas: { type: Number, default: 0 },
  dificultad: { type: String, enum: ['Fácil', 'Media', 'Difícil'], required: true },
  recomendacion: { type: Boolean, default: true },
  textoReseña: { type: String },
}, { timestamps: true });

export const Review = mongoose.model('Review', reviewSchema);
