# TaskFlow

## 📖 Description

Personal Task Tracker is a simple, responsive web application built with React.js that helps users manage their daily tasks efficiently. It features a basic login, task CRUD operations, filtering, and data persistence using localStorage. Designed for ease of use and clean code, it's perfect for personal productivity.

## 🚀 Features

- Simple login (username only, stored in localStorage)
- Add, edit, and delete tasks
- Mark tasks as completed or pending
- Inline or modal editing for tasks
- Confirmation prompt before deleting tasks
- Visual distinction between completed and pending tasks
- Display of task creation date and time
- Filter tasks by All, Completed, or Pending
- Task count for each filter
- Data persistence with localStorage (tasks remain after refresh)
- Responsive design for mobile and desktop

### 🌟 Bonus Features

- Task categories/tags
- Dark mode toggle
- Search functionality
- Task priority levels
- Due dates for tasks
- Smooth animations/transitions

## 🛠 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/personal-task-tracker.git
   cd personal-task-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧰 Technologies Used

- React.js (functional components & hooks)
- CSS (with Tailwind CSS for styling)
- localStorage (for data persistence)
- Vite (for fast development build)

## 🔗 Live Demo

[View the deployed app here](https://your-live-demo-url.com)

## 🖼 Screenshots

### Dashboard (Desktop)
![Dashboard Screenshot](screenshots/dashboard-desktop.png)

### Mobile View
![Mobile Screenshot](screenshots/dashboard-mobile.png)

## 📦 Project Structure

```
src/
  components/
    Login.tsx
    TaskForm.tsx
    TaskItem.tsx
    TaskList.tsx
    FilterTabs.tsx
    CategoryManager.tsx
    CategoryFilter.tsx
    Dashboard.tsx
  contexts/
    ThemeContext.tsx
  hooks/
    useTasks.ts
  types/
    task.ts
  utils/
    storage.ts
  index.css
  App.tsx
  main.tsx
```

## 🧪 Sample Data

```js
const sampleTasks = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features",
    completed: true,
    createdAt: "2024-01-14T15:30:00Z"
  }
];
```

## 📝 Credits

- Assignment by [Your Company/Interviewer]
- Developed by [Your Name]

## 🪪 License

This project is licensed under the MIT License.

---

**Tips:**  
- For Markdown formatting help, see the [Markdown Guide](https://www.markdownguide.org/cheat-sheet/)  
- For more README inspiration, check [READMEhowto](https://github.com/Tinymrsb/READMEhowto) and [how_to_make_README.md](https://github.com/khodekhadem/how_to_make_README.md) 