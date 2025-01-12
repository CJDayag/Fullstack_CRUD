<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::query();

        // Search functionality
        if ($request->has('search')) {
            $query->where('title', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('description', 'LIKE', '%' . $request->search . '%');
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 10);
        $task = $query->paginate($perPage);

        return response()->json($task);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description' => 'nullable',
            'status' => 'in:pending,in_progress,completed',
            'due_date' => 'nullable|date'
        ]);

        $task = Task::create($validatedData);
        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $validatedData = $request->validate([
            'title' => 'sometimes|required|max:255',
            'description' => 'nullable',
            'status' => 'in:pending,in_progress,completed',
            'due_date' => 'nullable|date'
        ]);

        $task->update($validatedData);
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
