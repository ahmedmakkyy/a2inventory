# a2inventory

## Overview
`a2inventory` is a Node.js application built with Express.js that provides API endpoints for managing products and orders. This project offers a basic inventory management system.

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/a2inventory.git
    ```
2. **Navigate into the project directory:**
    ```bash
    cd a2inventory
    ```
3. **Install the dependencies:**
    ```bash
    npm install
    ```

### Running the Server

To start the server in development mode:

1. **Open the project in VS Code:**
    ```bash
    code .
    ```
2. **Open the terminal (Ctrl+J) and start the server:**
    ```bash
    npm run start:dev
    ```

The server will start and listen on port 5000. You can then access the API endpoints using a browser or a tool like Postman.

## API Endpoints

### Products

- **Get all products:**
    ```http
    GET http://localhost:5000/api/products
    ```
    This endpoint returns a list of all products.

### Orders

- **Get all orders:**
    ```http
    GET http://localhost:5000/api/orders
    ```
    This endpoint returns a list of all orders.

