const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/todos', todosRouter);

// Exporta la aplicación sin iniciar el servidor
module.exports = app;

// Inicia el servidor solo si no estamos en modo de prueba
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}