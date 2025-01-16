Do-it Task

A task management application built using React and Redux with Material-UI for styling. The application is designed to enhance productivity by allowing users to manage tasks efficiently. It features dark and light mode themes, responsive design, and intuitive navigation.

Features

Task Management:

Add, edit, and delete tasks.

Mark tasks as completed.

Dark/Light Theme:

Switch between dark and light themes for better usability.

Responsive Design:

Optimized for all devices.

Sidebar and task details adaptively open/close based on screen size.

Search and Filter Tasks:

Search tasks using a search bar.

Toggle between list and card views.

Modern UI/UX:

Built with Material-UI and icons from Lucide-React.

Installation

Clone the repository:

git clone https://github.com/Aqib1239/Do-it_Task.git

Navigate to the project directory:

cd Do-it_Task

Install dependencies:

npm install

Start the development server:

npm start

Open the application in your browser at http://localhost:3000.

Folder Structure

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

Usage

Dark and Light Mode

Toggle dark and light themes using the theme button in the header.

Adding Tasks

Type a task in the input field.

Click the Add Task button to save the task.

Viewing Task Details

Click on a task to view its details in the Task Details panel.

Close the panel by clicking the close button.

Responsive Behavior

On small screens, opening the sidebar closes the Task Details view and vice versa.

On large screens, both views can remain open simultaneously.

Dependencies

React: Frontend library.

Redux: State management.

Material-UI: UI components and theming.

Lucide-React: Icons.

Contributing

Contributions are welcome! Follow these steps to contribute:

Fork the repository.

Create a new branch:

git checkout -b feature/your-feature-name

Make your changes and commit them:

git commit -m "Add your feature description here"

Push to the branch:

git push origin feature/your-feature-name

Open a Pull Request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

