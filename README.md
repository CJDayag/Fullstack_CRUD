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

**IMPORTANT**
Make sure you installed the following:
- Composer (Latest Version)
- PHP (Latest Version)
- Laravel Herd **OR** XAMPP control panel

## Backend Setup (XAMPP Control Panel):
1. Clone the repository
   ```bash
   https://github.com/CJDayag/Fullstack_CRUD.git
   ```
2. Place the repository inside the xampp's htdocs
3. Make sure the following is uncommented in your **php configuration settings.** (located in "_xampp/php/php.ini_")
   ```config
   ;extension=zip //Remove the ; to uncomment
   ```
4. Navigate to the backend directory
   ```bash
   cd backend_api
   ```
5. Install PHP Dependencies
   ```bash
   composer install
   ```
6. Copy the **.env** file.
   ```bash
   copy .env.example .env
   ```
7. Generate application key
   ```bash
   php artisan key:generate
   ```
6. Configure the database setting in _.env_ file:
   ```text
   DB_CONNECTION=mysql
     DB_HOST=YOUR_HOST
     DB_PORT=YOUR_DB_PORT
     DB_DATABASE=YOUR_DATABASE
     DB_USERNAME=YOUR_USERNAME
     DB_PASSWORD=yOUR_PASSWORD
   ```
7. Run the migrations
   ```bash
   php artisan migrate
   ```
8. Run the Development Server:
   ```bash
   php artisan serve
   ```
9. Configure App URL
-  In the _.env_ file, change the **_APP_URL_** into your localhost URL (You will see the url when you run the development server):
   ```text
   APP_URL=http://backend_api.test  //Change to your localhost URL
   ```
- Then run again the development server
  ```bash
  php artisan serve
  ```
## Backend Setup (Laravel Herd):

1. Clone the repository
  ```bash
  https://github.com/CJDayag/Fullstack_CRUD.git
  ```
2. Move the project into your **Herd** directory
3. Open your Herd directory in the control panel
4. Go to the backend directory
  ```bash
  cd backend_api
  ```
5. Link the **_backend_api_** directory:
  ```bash
  herd link
  ```
6. Install PHP Dependencies
  ```bash
   composer install
   ```
7. Copy the **.env** file.
   ```bash
   copy .env.example .env
   ```
8. Generate application key
   ```bash
   php artisan key:generate
   ```
9. Configure the database setting in _.env_ file:
   ```text
   DB_CONNECTION=mysql
     DB_HOST=YOUR_HOST
     DB_PORT=YOUR_DB_PORT
     DB_DATABASE=YOUR_DATABASE
     DB_USERNAME=YOUR_USERNAME
     DB_PASSWORD=yOUR_PASSWORD
   ```
10. Run the migrations
   ```bash
   php artisan migrate
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
   'allowed_origins' => ['YOUR_FRONTEND_URL'],
   ```
5. Edit all the API endpoint routes in the **_TaskShow.jsx_**, **_TaskForm.jsx_** {all located inside src/components)
   
   ```TaskShow.jsx line 28
   ///_TaskShow.jsx line 28_
   const response = await axios.get(`YOUR_BACKEND_URL/api/tasksshow/${id}`); ///Change based on your APP_URL
   ```

   ```TaskShow.jsx line 44
   await axios.delete(`YOUR_BACKEND_URL/api/tasksdelete/${id}`); ///Change based on your APP_URL
   ```

   ```TaskForm.jsx line 36
   ///_TaskForm.jsx line 36_
   const response = await axios.get(`YOUR_BACKEND_URL/api/tasksshow/${id}`); //Change based on your APP_URL
   ```
   
   ```TaskForm.jsx line 62
   ///_TaskForm.jsx line 62_
   await axios.put(`YOUR_BACKEND_URL/api/tasksupdate/${id}`, formData); ///Change based on your APP_URL
   ```
    ```TaskForm.jsx line 65
    ///_TaskForm.jsx line 65_
    await axios.post('YOUR_BACKEND_URL/api/taskscreate', formData); ///Change based on your APP_URL
    ```
   
6. Start the Development process
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
