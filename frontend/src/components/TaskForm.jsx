import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    due_date: '',
  });

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://backend_api.test/api/tasksshow/${id}`);
      const task = response.data;
      
      // Format the date to YYYY-MM-DD for the date input
      const formattedDate = task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : '';
      
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        due_date: formattedDate,
      });
    } catch (error) {
      console.error('Error fetching task:', error);
      toast.error('Failed to fetch task');
      navigate('/');
    }
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await axios.put(`http://backend_api.test/api/tasksupdate/${id}`, formData);
        toast.success('Task updated successfully');
      } else {
        await axios.post('http://backend_api.test/api/taskscreate', formData);
        toast.success('Task created successfully');
      }
      navigate('/');
    } catch (error) {
      console.error('Error operating task:', error.response || error.message);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
    setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value) => {
    handleChange({
      target: {
        name: "status", // The name of the field in `formData`
        value, // The selected value
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit Task' : 'Create Task'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="block text-sm font-medium mb-2">Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2"
            required
          />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-2">Description</Label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            rows="4"
          />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-2">Status</Label>
          <Select
            name="status"
            value={formData.status}
            onValueChange={handleSelectChange}
            className="px-4 py-2 border rounded-lg"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block text-sm font-medium mb-2">Due Date</Label>
          <Input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="outline"
            type="button"
            onClick={id ? () => navigate(`/task/${id}`) : () => navigate('/')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </Button>
          <Button variant="primary"
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {id ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;