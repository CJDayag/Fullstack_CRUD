<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_origins' => ['http://localhost:5173'], // Add your front-end URL here
    'allowed_methods' => ['*'], // Allow all methods (GET, POST, etc.)
    'allowed_headers' => ['*'], // Allow all headers
    'supports_credentials' => true,
];