# Full Stack CRUD
A modern web application built with Laravel (backend) and React with Axios (frontend) for managing records with full CRUD functionality, search, sort, and pagination capabilities.

## Features

- RESTful API with Laravel backend
- React frontend with Tailwind CSS styling
- Full CRUD operations
- Search functionality
- Pagination
- Responsive design
- Toast notifications for user feedback
- Loading states
- Modal forms for creating/editing records
- Error handling

## Technologies Used

- Backend:
  - Laravel
  - MySQL
  - PHP
- Frontend:
  - React
  - Axios
  - Tailwind CSS
  - shadcn/ui components
  - Lucide icons

# Installation

## Backend Setup:
**IMPORTANT**
Make sure you installed the following:
- Composer (Latest Version)
- PHP (Latest Version)
- Laravel Herd **OR** XAMPP control panel

1. Clone the repository
   ```bash
   https://github.com/CJDayag/Fullstack_CRUD.git
   ```
2. Go to the backend directory
   ```bash
   cd backend_api
   ```
3. Install PHP Dependencies
   ```bash
   composer install
   ```
4. Copy the **.env** file.
   ```bash
   copy .env.example .env
   ```
5. Generate application key
   ```bash
   php artisan key:generate
   ```
6. Configure the database settings:
   ```text
   DB_CONNECTION=mysql
     DB_HOST=YOUR_HOST
     DB_PORT=YOUR_PORT
     DB_DATABASE=YOUR_DATABASE
     DB_USERNAME=YOUR_USERNAME
     DB_PASSWORD=yOUR_PASSWORD
   ```
7. Run the migrations
   ```bash
   php artisan migrate
   ```
   
8. Configure App URL
   
### For XAMPP Users:
-  In the _.env_ file, change the **_APP_URL_** into your localhost port number:
   ```text
   APP_URL=http://backend_api.test  //Change to your localhost port number
   ```
- Then run the development server
  ```bash
  php artisan serve
  ```
### For Laravel Herd Users:
- Move the project into your **Herd** directory
- Open your Herd directory in the control panel
- Go to the backend directory
  ```bash
  cd backend_api
  ```
- Link the **_backend_api_** directory:
  ```bash
  herd link
  ```
- Test your laravel project in the browser using the url
  ```text
  backend_api.test
  ```
  ## Frontend Setup
  **IMPORTANT**
  Make sure you installed the following:
  - Node.js (Latest Version)
  - NPM (Latest Version)
  
1. Navigate to your frontend directory
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies
   ```bash
   npm install
   ```
3. In your **backend_api** directory, find the **cors.php** file under the **config** diretory
4. Change the allowed origins into your frontend's port number:
   ```text
   'allowed_origins' => ['YOUR_FRONTEND_PORT'],
   ```
5. Start the Development process
   ```bash
   npm run dev
   ```
## API Endpoints

- `GET /api/tasks` - Get all records (with pagination, sorting, and search)
  - Query parameters:
    - `page`: Page number
    - `search`: Search term
    - `sort_by`: Field to sort by
    - `sort_order`: Sort direction (asc/desc)
- `POST /api/taskscreate` - Create a new record
- `GET /api/tasksshow/{task}` - Get a specific record
- `PUT /api/tasksupdate/{task}` - Update a record
- `DELETE /api/tasksdelete/{task}` - Delete a record

## Browser Support

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Support

The application is fully responsive and tested on:
- iOS devices (iPhone, iPad)
- Android devices
- Various screen sizes and orientations
