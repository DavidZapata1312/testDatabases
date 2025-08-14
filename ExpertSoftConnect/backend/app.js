require('dotenv').config();
const express = require('express');
const cors = require('cors');



// Import routes
const clientsRoutes = require('./routes/clients')
const chargeRoutes = require('./routes/charge');
const advanceRoutes= require('./routes/advanceconsultes')


const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors({
  origin: 'http://127.0.0.1:5500', // front port
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/charge', chargeRoutes);
app.use('/clients', clientsRoutes);
app.use('/advance', advanceRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});