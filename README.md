# Task Management System

## Project Overview

Task Management System is a web application designed to simplify the organization and tracking of tasks. Features such as user authentication, task creation, editing, deletion, and search allow users to efficiently manage their daily tasks. The application leverages the latest web technologies to ensure a seamless user experience.
### Key Features

- **User Authentication:** Secure registration and login using JWT.
- **Task Management:**
  - Add tasks with title, descriptions, and status.
  - View all tasks.
  - Edit existing tasks.
  - Delete tasks.
  - Search and filter tasks by title or status.
- **Database Relations:**
  - Each user can have multiple tasks.

## Setting up and Running the Project Locally

### Prerequisites

- **Node.js** (v20.18.1 or above)
- **npm** (v10.8.2 or above)
- **MySQL** (Ensure you have a running MySQL instance)
- **Git**

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/gitBySharma/task_management-BusinessHero.git
   cd task_management-BusinessHero
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=your_exposed_port
     DB_NAME=your_database_name
     DB_USER=your_database_user
     DB_PASSWORD=your_database_password
     DB_HOST=localhost
     JWT_SECRET=your_jwt_secret
     ```

4. **Set Up the Database**

   - Ensure your MySQL database is running.
   - The application will automatically create tables upon startup based on Sequelize models.

5. **Run the Application**

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:<your_exposed_port>`.

## API Details

### Base URL (Local)

```
http://localhost:<your_exposed_port>
```
### Base URL (Deployed)

```
http://localhost:<your_exposed_port>
```
## Endpoints

### User Management

- **POST** `/user/signup`

  - Register a new user.
  - Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "Password@1234"
    }
    ```
  - Password must be alphanumeric of minimum 8 chars and must contain atleast one special character.

- **POST** `/user/login`

  - Authenticate a user and return a JWT.
  - Request Body:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "Password@1234"
    }
    ```

### Task Management

- **GET** `/tasks/getAllTasks`

  - Retrieve all tasks for the authenticated user.
  ##### Search and Filter
- **GET** `/tasks/getAllTasks?title=<title_of_a_task>` - Search for tasks by a title.
- **GET** `/tasks/getAllTasks?status=<status_of_task>` - Filter tasks by status.
  
  ##### Pagination
- **GET** `/tasks/getAllTasks?page=<current_page_number>&limit=<number_of_tasks>` - Paginate data with page no. and number of tasks.

- **POST** `/tasks/addTask`

  - Create a new task.
  - Request Body:
    ```json
    {
      "title": "Task Title",
      "description": "Task Details",
      "status": "pending"
    }
    ```

- **PUT** `/tasks/updateTask/:id`

  - Update a task by ID.
  - Request Body:
    ```json
    {
      "title": "Updated Task Title",
      "description": "Updated Task Details",
      "status": "completed"
    }
    ```

- **DELETE** `/tasks/deleteTask/:id`

  - Delete a task by ID.

### Notes

- Include the JWT in the `Authorization` header for protected routes, i.e. all the task management routes.
- See example below
  ```
  get("task/getAllTasks/",{ headers: { "Authorization": <your_token> } })
  ```
- Refer to the API documentation for detailed information on request/response formats

## Project Structure

```
TaskManagement-BusinessHero/
├── controllers/     # Route controllers (user.js, task.js)
├── middleware/      # Authentication middleware (auth.js)
├── models/          # Sequelize models (User, Task)
├── routes/          # Route definitions (user.js, task.js)
├── util/            # Utility files (database.js)
├── app.js           # Main application file
├── package.json     # Project metadata and dependencies
├── .env.example     # Example environment variables
├── README.md        # Project documentation
```



Happy Task Managing! 🚀

