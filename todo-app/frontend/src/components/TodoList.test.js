import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  const mockTodos = [
    { id: 1, task: 'Test Task 1', completed: 0 },
    { id: 2, task: 'Test Task 2', completed: 1 },
  ];

  beforeEach(() => {
    // Mockea fetch para devolver los todos iniciales
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTodos),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks(); // Limpia los mocks después de cada prueba
  });

  test('Renderiza la lista de tareas', async () => {
    render(<TodoList />);
    const tasks = await screen.findAllByRole('listitem');
    expect(tasks).toHaveLength(2);
  });

  test('Agrega una nueva tarea', async () => {
    render(<TodoList />);

    // Mockea fetch para devolver la nueva tarea después de agregarla
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 3, task: 'New Task', completed: 0 }),
      })
    );

    // Mockea fetch para devolver los todos actualizados
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([...mockTodos, { id: 3, task: 'New Task', completed: 0 }]),
      })
    );

    const input = screen.getByPlaceholderText('Add a new task');
    const button = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    const newTask = await screen.findByText('New Task');
    expect(newTask).toBeInTheDocument();
  });
});