import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/axios';
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { buttonVariants } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300); // Wait 300ms after last keystroke before searching

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch tasks when debounced search term changes
  useEffect(() => {
    fetchTasks();
  }, [currentPage, debouncedSearch, sortBy, sortOrder]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/tasks', {
        params: {
          page: currentPage,
          search: debouncedSearch,
          sort_by: sortBy,
          sort_order: sortOrder
        }
      });
      
      if (response.data && response.data.data) {
        setTasks(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.per_page));
      } else {
        setTasks([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      setError(error.message);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

    const formatDate = (date) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const formattedDate = new Date(date).toLocaleDateString('en-US', options);
      return formattedDate;
    };

  // Show error state
  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  // Show loading state
  if (loading) {
    return <div className="text-center py-4">Loading tasks...</div>;
  }
  
  return (
    <div className="space-y-4 p-4">
  {/* Search and Create section - stack on mobile */}
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
    <Input
      type="text"
      placeholder="Search tasks..."
      className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      value={searchTerm}
      onChange={handleSearch}
    />
    <Button asChild variant="default"
    >
      <Link to="/create">
      Create Task
      </Link>
    </Button>
  </div>

  {/* Table section with horizontal scroll on small screens */}
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="overflow-x-auto">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap" onClick={() => handleSort('title')}>
              Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap" onClick={() => handleSort('status')}>
              Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-gray-50">
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm">{task.title}</TableCell>
              <TableCell className="hidden sm:table-cell px-6 py-4 text-sm">
                <div className="max-w-xs lg:max-w-md truncate">
                  {task.description}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </TableCell>
              <TableCell className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm">
                {formatDate(task.due_date)}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex space-x-4">
                <Button asChild variant="link"
                >
                  <Link to={`/task/${task.id}`}>
                  Show
                  </Link>
                </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>

  <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageClick(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => handlePageClick(pageNumber)}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Optional Ellipsis */}
        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageClick(currentPage + 1)}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
</div>
  );
}

export default TaskList;