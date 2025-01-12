import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"


const TaskShow = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://backend_api.test/api/tasksshow/${id}`);
        setTask(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const [open, setOpen] = useState(false);
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://backend_api.test/api/tasksdelete/${id}`);
      toast.success('Task deleted successfully');
      navigate('/'); // Navigate back to homepage after successful deletion
    } catch (error) {
      console.error('Error deleting task:', error.response || error.message);
      toast.error('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Task not found</div>
      </div>
    );
  }
 
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
              <div className="space-x-4">
                <Button asChild variant="primary"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Link to={`/edit/${task.id}`}>
                  Edit
                  </Link>
                  </Button>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
                      Delete Task
                    </DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this task?
                    </DialogDescription>
                    <DialogFooter>
                    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="destructive"
                    onClick={() => handleDelete(task.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </Button> 
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  {task.description}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1">
                  <span className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(task.due_date).toLocaleDateString()}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Created At</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(task.created_at).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Footer */}
          <div className="px-4 py-4 sm:px-6 bg-gray-50">
            <Button asChild variant="link"
            >
              <Link to="/">
              ← Back to Tasks
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskShow;