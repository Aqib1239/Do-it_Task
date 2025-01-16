# Do-it Task

A task management application built using React and Redux with Material-UI for styling. The application is designed to enhance productivity by allowing users to manage tasks efficiently. It features dark and light mode themes, responsive design, and intuitive navigation.

---

## Features

- **Task Management:**
  - Add, edit, and delete tasks.
  - Mark tasks as completed.

- **Dark/Light Theme:**
  - Switch between dark and light themes for better usability.

- **Responsive Design:**
  - Optimized for all devices.
  - Sidebar and task details adaptively open/close based on screen size.

- **Search and Filter Tasks:**
  - Search tasks using a search bar.
  - Toggle between list and card views.

- **Modern UI/UX:**
  - Built with Material-UI and icons from Lucide-React.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aqib1239/Do-it_Task.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Do-it_Task
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser at `http://localhost:3000`.

---

## Folder Structure

```
Do-it_Task/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components (Sidebar, TaskInput, TaskList, TaskDetails)
│   ├── redux/       # Redux store, slices
│   ├── App.js       # Main application file
│   ├── index.js     # Entry point
│   ├── styles/      # Global styles
│   └── theme.js     # Theme configuration
├── package.json     # Project metadata and dependencies
└── README.md        # Project documentation
```

---

## Usage

### Dark and Light Mode
- Toggle dark and light themes using the theme button in the header.

### Adding Tasks
1. Type a task in the input field.
2. Click the **Add Task** button to save the task.

### Viewing Task Details
- Click on a task to view its details in the Task Details panel.
- Close the panel by clicking the close button.

### Responsive Behavior
- On small screens, opening the sidebar closes the Task Details view and vice versa.
- On large screens, both views can remain open simultaneously.

---

## Dependencies

- **React**: Frontend library.
- **Redux**: State management.
- **Material-UI**: UI components and theming.
- **Lucide-React**: Icons.

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature description here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

