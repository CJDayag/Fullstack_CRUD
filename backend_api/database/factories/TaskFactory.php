<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Task;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Task::class;

    public function definition()
    {
        return [
            'title' => $this->faker->word, // Generates a random word for the title
            'description' => $this->faker->sentence, // Generates a random sentence for the description
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed']), // Randomly selects one of the statuses
            'due_date' => $this->faker->optional()->date(), // Generates a random date, or null
        ];
    }
}
