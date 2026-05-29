const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API REST
app.use('/api/auth', authRoutes);
app.use('/api/servicos', serviceRoutes);
app.use('/api/agendamentos', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor Vision Car rodando na porta ${PORT}`);
});