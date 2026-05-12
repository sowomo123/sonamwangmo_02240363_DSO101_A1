const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Server is running');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return tasks array', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'This is a test task',
        status: 'pending'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(taskData.title);
      expect(response.body.data.status).toBe(taskData.status);
    });
  });
});
