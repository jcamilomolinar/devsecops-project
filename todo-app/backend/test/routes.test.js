const request = require('supertest');
const app = require('../app'); // Importa la aplicación Express

describe('Todo Routes', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(5000, done); // Inicia el servidor en un puerto específico
  });

  afterAll((done) => {
    server.close(done); // Cierra el servidor después de las pruebas
  });

  test('Obtener todas las tareas', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('Agregar una tarea', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({ task: 'New Task' });
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  test('Actualizar una tarea', async () => {
    const response = await request(app)
      .put('/api/todos/1')
      .send({ completed: 1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Task updated');
  });

  test('Eliminar una tarea', async () => {
    const response = await request(app).delete('/api/todos/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Task deleted');
  });
});