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
  - Tailwind CSS
  - shadcn/ui components
  - Lucide icons

# Installation

## Backend Setup:
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
4. Configure the database settings:
   ```text
   DB_CONNECTION=mysql
     DB_HOST=YOUR_HOST
     DB_PORT=YOUR_PORT
     DB_DATABASE=YOUR_DATABASE
     DB_USERNAME=YOUR_USERNAME
     DB_PASSWORD=yOUR_PASSWORD
   ```
5. Configure App URL (For XAMPP Users)
   In the _.env_ file, change the **_APP_URL_** into your localhost port number:
   ```text
   APP_URL=http://backend_api.test  //Change to your localhost port number
   ```
   
   
