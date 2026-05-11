const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Render PostgreSQL
  }
});

const connectDB = async () => {
  try {
    // Test the connection
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    
    console.log('PostgreSQL Connected Successfully');
    console.log('Current time:', result.rows[0].now);
    
    // Create tasks table if it doesn't exist
    await createTasksTable();
    
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.log('Server will continue running without database connection');
  }
};

const createTasksTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await pool.query(createTableQuery);
    console.log('Tasks table is ready');
  } catch (error) {
    console.error('Error creating tasks table:', error.message);
  }
};

module.exports = {
  pool,
  connectDB
};
