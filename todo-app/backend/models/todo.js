const db = require('../db/database');

class Todo {
  static getAll(callback) {
    db.all('SELECT * FROM todos', callback);
  }

  static add(task, callback) {
    db.run('INSERT INTO todos (task) VALUES (?)', [task], callback);
  }

  static update(id, completed, callback) {
    db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], callback);
  }

  static delete(id, callback) {
    db.run('DELETE FROM todos WHERE id = ?', [id], callback);
  }
}

module.exports = Todo;