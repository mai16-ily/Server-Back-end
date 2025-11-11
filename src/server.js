import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router as juegosRoutes } from './routes/juegos.js';
import { router as reseñasRoutes } from './routes/reseñas.js';
import dotenv from 'dotenv';
// Configuración especial de dotenv para ES Modules
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// MIDDLEWARES
// CORS: Permite la comunicación segura con React (localhost:3000)
app.use(cors({
  origin: ['http://localhost:5173', 'https://mai16-ily.github.io/Server-Back-end/']
}));

app.use(express.json()); // Permite leer el body en formato JSON
// CONEXIÓN A MONGODB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error de conexión DB:', err));

app.use('/api/juegos', juegosRoutes);
app.use('/api/reseñas', reseñasRoutes);

// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});