# To-Do List Web Application

A simple, modern To-Do List application built with React, TypeScript, and Tailwind CSS. This application provides a clean and intuitive interface for managing daily tasks.

## Features

- ✅ Add new tasks with title and optional description
- ✏️ Edit existing tasks inline
- 🗑️ Delete tasks with confirmation
- 🔄 Mark tasks as pending or completed
- 📱 Responsive design for desktop and mobile
- 🎨 Clean and modern UI with Tailwind CSS
- ⚡ Fast and lightweight with Vite
- 🔒 TypeScript for type safety

## Project Structure

```
todo-list-app/
├── src/
│   ├── components/
│   │   ├── TaskItem.tsx      # Individual task component
│   │   └── TaskForm.tsx      # Add/Edit task form
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   ├── types.ts              # TypeScript type definitions
│   └── index.css             # Global styles and Tailwind imports
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── index.html                # HTML template
```

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (usually comes with Node.js)

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd A_1
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```
   (The port may vary if 5173 is already in use)

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The build files will be generated in the `dist` folder.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Usage

### Adding Tasks
1. Click the **"+ Add New Task"** button
2. Fill in the task title (required)
3. Add an optional description
4. Set the status (pending/completed)
5. Click **"Add Task"** to save

### Editing Tasks
1. Click the **edit icon** (pencil) on any task
2. Modify the task details in the form
3. Click **"Update Task"** to save changes

### Managing Task Status
- Click the **checkbox** to toggle between pending and completed status
- Tasks are automatically organized into "Pending" and "Completed" sections

### Deleting Tasks
1. Click the **delete icon** (trash can) on any task
2. The task will be removed immediately

## Code Features

### Component-Based Architecture
- **App.tsx**: Main application with state management
- **TaskItem.tsx**: Individual task display with actions
- **TaskForm.tsx**: Reusable form for adding/editing tasks

### TypeScript Benefits
- Type safety for all components and props
- Better IDE support with autocomplete
- Reduced runtime errors

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Flexible layouts that work on all screen sizes
- Touch-friendly buttons and controls

### Form Validation
- Required field validation for task titles
- Minimum length requirements
- Real-time error feedback

## Customization

### Adding New Features
The codebase is structured to make it easy to add new features:
- Task priorities
- Due dates
- Task categories
- Search and filter functionality
- Data persistence (localStorage or backend)

### Styling
Customize the appearance by modifying:
- Tailwind configuration in `tailwind.config.js`
- Component-specific styles in individual components
- Global styles in `index.css`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality
The project follows React and TypeScript best practices:
- Functional components with hooks
- Proper TypeScript typing
- Clean component separation
- Semantic HTML structure

## Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

---

**Happy task management! 📝✅**