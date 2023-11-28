const express = require('express');
const remedyRoutes = require('./controllers/remedyController');

const app = express();

app.use(express.json());

// Rotas para o CRUD de remédios
app.use('/remedies', remedyRoutes);

// Rotas para o gerenciamento do dispenser dos medicamentos


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});