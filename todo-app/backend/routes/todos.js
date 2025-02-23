const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

// Obtener todas las tareas
router.get('/', (req, res) => {
  Todo.getAll((err, todos) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(todos);
  });
});

// Agregar una tarea
router.post('/', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  Todo.add(task, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Actualizar una tarea
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  Todo.update(id, completed, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Task updated' });
  });
});

// Eliminar una tarea
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Todo.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Task deleted' });
  });
});

module.exports = router;