const { pool } = require('../database-pg');

class Task {
  static async create(taskData) {
    const { title, description, status = 'pending' } = taskData;
    const query = `
      INSERT INTO tasks (title, description, status)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [title, description, status];
    
    try {
      const result = await pool.query(query, values);
      return this.formatTask(result.rows[0]);
    } catch (error) {
      throw new Error(`Error creating task: ${error.message}`);
    }
  }

  static async findAll() {
    const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
    
    try {
      const result = await pool.query(query);
      return result.rows.map(task => this.formatTask(task));
    } catch (error) {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM tasks WHERE id = $1';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0] ? this.formatTask(result.rows[0]) : null;
    } catch (error) {
      throw new Error(`Error finding task: ${error.message}`);
    }
  }

  static async update(id, taskData) {
    const { title, description, status } = taskData;
    const query = `
      UPDATE tasks 
      SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;
    const values = [title, description, status, id];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0] ? this.formatTask(result.rows[0]) : null;
    } catch (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0] ? this.formatTask(result.rows[0]) : null;
    } catch (error) {
      throw new Error(`Error deleting task: ${error.message}`);
    }
  }

  static formatTask(task) {
    return {
      id: task.id.toString(),
      title: task.title,
      description: task.description || '',
      status: task.status,
      createdAt: task.created_at,
      updatedAt: task.updated_at
    };
  }
}

module.exports = Task;
