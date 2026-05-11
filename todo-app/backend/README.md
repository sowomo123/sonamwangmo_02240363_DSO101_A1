# To-Do List Backend API

RESTful API for the To-Do List application built with Node.js, Express, and MongoDB.

## Features

- ✅ Full CRUD operations for tasks
- 🔒 Security with Helmet.js
- 🚦 Rate limiting
- 🌐 CORS support
- 📝 Comprehensive error handling
- 📊 Request logging
- 🔧 Environment-based configuration

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Security**: Helmet.js, express-rate-limit
- **Environment**: dotenv

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   DB_HOST=localhost
   DB_PORT=27017
   DB_NAME=todo_list
   DB_USER=
   DB_PASSWORD=
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start MongoDB** (make sure it's running on your system)

4. **Run the server**:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| PATCH | `/api/tasks/:id/toggle` | Toggle task status |

### Health Check

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/health` | Server health status |

## Request/Response Examples

### Create Task
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the full-stack todo app",
  "status": "pending"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "64a7b8c9d1e2f3g4h5i6j7k8",
    "title": "Complete project",
    "description": "Finish the full-stack todo app",
    "status": "pending",
    "createdAt": "2023-07-06T12:00:00.000Z",
    "updatedAt": "2023-07-06T12:00:00.000Z",
    "__v": 0
  }
}
```

### Get All Tasks
```bash
GET /api/tasks
```

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64a7b8c9d1e2f3g4h5i6j7k8",
      "title": "Complete project",
      "description": "Finish the full-stack todo app",
      "status": "pending",
      "createdAt": "2023-07-06T12:00:00.000Z",
      "updatedAt": "2023-07-06T12:00:00.000Z",
      "__v": 0
    }
  ]
}
```

## Error Handling

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message description"
}
```

## Validation

Tasks are validated with the following rules:
- **Title**: Required, 2-100 characters
- **Description**: Optional, max 500 characters
- **Status**: Must be 'pending' or 'completed'

## Security Features

- **Helmet.js**: Sets security-related HTTP headers
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for specific frontend origin
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Prevents information leakage

## Development

### Environment Variables
The application uses `.env` file for configuration. Never commit `.env` to version control.

### Database Connection
The app supports both authenticated and non-authenticated MongoDB connections:
- With auth: `mongodb://username:password@host:port/database`
- Without auth: `mongodb://host:port/database`

### Logging
All API requests are logged to console with timestamp and HTTP method.

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Use a proper MongoDB connection string with authentication
3. Configure `FRONTEND_URL` to your production frontend domain
4. Use a process manager like PM2 for the Node.js application
5. Set up reverse proxy (nginx) if needed

## License

MIT License
