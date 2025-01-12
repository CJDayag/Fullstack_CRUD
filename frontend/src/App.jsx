import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navbar from './components/Navbar';
import TaskShow from './components/TaskShow';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/create" element={<TaskForm />} />
            <Route path="/task/:id" element={<TaskShow />} />
            <Route path="/edit/:id" element={<TaskForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;