import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {router as taskRoutes } from './routes/task.js';
import dotenv from 'dotenv';
// Configuración especial de dotenv para ES Modules
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// MIDDLEWARES
// CORS: Permite la comunicación segura con React (localhost:3000)
app.use(cors({
    origin: 'http://localhost:5173' 
}));
app.use(express.json()); // Permite leer el body en formato JSON
// CONEXIÓN A MONGODB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión DB:', err));
    
// RUTAS
app.use('/api/tasks', taskRoutes);
// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});