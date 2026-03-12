# Full-Stack To-Do List Application

A complete full-stack To-Do List application with React frontend, Node.js backend, and MongoDB database.

## 🏗️ Architecture

### Frontend (React + TypeScript + Tailwind CSS)
- **Location**: `./src/`
- **Port**: 5173 (development)
- **Environment**: `.env` with `REACT_APP_API_URL`

### Backend (Node.js + Express + MongoDB)
- **Location**: `./backend/`
- **Port**: 5000
- **Environment**: `.env` with database and server config

### Database (MongoDB)
- **Database**: `todo_list`
- **Collection**: `tasks`
- **Schema**: Title, Description, Status, Timestamps

## 🚀 Quick Start

### Prerequisites
1. **Node.js** (v16+)
2. **MongoDB** (running locally or connection string)
3. **npm** or **yarn**

### Setup Steps

#### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database configuration
npm start
```

Backend will run on: `http://localhost:5000`

#### 2. Frontend Setup
```bash
# In root directory
npm install
cp .env.example .env
# Edit .env with REACT_APP_API_URL=http://localhost:5000
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 📡 API Endpoints

### Tasks CRUD Operations

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| PATCH | `/api/tasks/:id/toggle` | Toggle task status |

### Health Check
- GET `/health` - Server status

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
DB_HOST=localhost
DB_PORT=27017
DB_NAME=todo_list
DB_USER=
DB_PASSWORD=

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# JWT (future auth)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

### Frontend (.env)
```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000
```

## 🗂️ Project Structure

```
A_1/
├── backend/                    # Node.js API server
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── models/
│   │   └── Task.js           # Mongoose schema
│   ├── routes/
│   │   └── tasks.js           # API routes
│   ├── server.js              # Express server
│   ├── .env.example          # Environment template
│   └── package.json
├── src/                      # React frontend
│   ├── components/
│   │   ├── TaskItem.tsx       # Task component
│   │   └── TaskForm.tsx       # Form component
│   ├── services/
│   │   └── api.ts            # API service
│   ├── App.tsx               # Main app
│   ├── types.ts              # TypeScript types
│   └── index.css             # Tailwind styles
├── .env.example              # Frontend env template
├── .gitignore               # Git ignore file
└── package.json             # Frontend dependencies
```

## 🔒 Security Features

### Backend
- **Helmet.js**: Security headers
- **Rate Limiting**: 100 requests/15min per IP
- **CORS**: Configured for frontend domain
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Sanitized error responses

### Frontend
- **Environment Variables**: API URL configuration
- **Error Handling**: User-friendly error messages
- **Type Safety**: Full TypeScript coverage

## 🧪 Testing the Integration

### 1. Start Backend
```bash
cd backend
npm start
# Should see: "Server running in development mode on port 5000"
# And: "MongoDB Connected: localhost"
```

### 2. Start Frontend
```bash
npm run dev
# Should see: "Local: http://localhost:5173/"
```

### 3. Test API
```bash
# Health check
curl http://localhost:5000/health

# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task","description":"Test description"}'

# Get all tasks
curl http://localhost:5000/api/tasks
```

### 4. Test Frontend
1. Open `http://localhost:5173` in browser
2. Try adding a new task
3. Check that it appears in the list
4. Try editing, deleting, and toggling tasks
5. Check browser console for any errors

## 🐛 Common Issues

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check `.env` database credentials
- Verify MongoDB is on default port 27017

### CORS Issues
- Check `FRONTEND_URL` in backend `.env`
- Verify frontend URL matches CORS config

### Environment Variable Issues
- Copy `.env.example` to `.env` in both directories
- Never commit `.env` files to Git
- Restart servers after changing `.env`

### Port Conflicts
- Backend uses port 5000
- Frontend uses port 5173
- Change if ports are already in use

## 📦 Deployment Notes

### Backend Deployment
1. Set `NODE_ENV=production`
2. Use production MongoDB connection string
3. Set proper `FRONTEND_URL`
4. Use process manager (PM2 recommended)

### Frontend Deployment
1. Set `REACT_APP_API_URL` to production backend URL
2. Build with `npm run build`
3. Deploy `dist/` folder to web server

## 🔮 Future Enhancements

- **User Authentication**: JWT-based login system
- **Task Categories**: Organize tasks by projects
- **Due Dates**: Add task deadlines
- **Search & Filter**: Find tasks quickly
- **Real-time Updates**: WebSocket integration
- **Mobile App**: React Native version

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.

---

**🎉 Full-stack application ready for development and deployment!**
