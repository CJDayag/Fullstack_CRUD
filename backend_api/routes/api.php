<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('tasks', [TaskController::class, 'index']); // GET /tasks - List all tasks
Route::post('taskscreate', [TaskController::class, 'store']); // POST /tasks - Create a new task
Route::get('tasksshow/{task}', [TaskController::class, 'show']); // GET /tasks/{task} - Show a single task
Route::put('tasksupdate/{task}', [TaskController::class, 'update']); // PUT /tasks/{task} - Update a task
Route::delete('tasksdelete/{task}', [TaskController::class, 'destroy']); // DELETE /tasks/{task} - Delete a task
