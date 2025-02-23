const Todo = require('../models/todo');
const db = require('../db/database');

describe('Todo Model', () => {
  beforeAll((done) => {
    db.run('DELETE FROM todos', done); // Limpia la base de datos antes de las pruebas
  });

  afterAll((done) => {
    db.close(done); // Cierra la conexión de la base de datos
  });

  test('Agregar una tarea', (done) => {
    Todo.add('Test Task', function (err) {
      expect(err).toBeNull();
      expect(this.lastID).toBeDefined();
      done();
    });
  });

  test('Obtener todas las tareas', (done) => {
    Todo.getAll((err, todos) => {
      expect(err).toBeNull();
      expect(todos.length).toBeGreaterThan(0);
      done();
    });
  });

  test('Actualizar una tarea', (done) => {
    Todo.update(1, 1, (err) => {
      expect(err).toBeNull();
      done();
    });
  });

  test('Eliminar una tarea', (done) => {
    Todo.delete(1, (err) => {
      expect(err).toBeNull();
      done();
    });
  });
});