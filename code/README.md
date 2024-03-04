# StreeSocial_Backend
StreeSocial Backend project which handles all the technical aspects of the application. It is built using Node.js, Express.js, MongoDB and Mongoose

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on process for submitting pull requests.

## Overview

This is a simple Express.js API for a project that manages users and products. The API is designed to handle user registration, product creation, retrieval, update, and deletion. The MongoDB database is used for data storage.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add the following environment variables:

   ```env
   MONGO_URI=<your-mongodb-uri>
   PORT=<optional-port-number, default is 5000>
   ```

4. Run the server:

   ```bash
   nodemon index.js
   ```

   The server will be running at `http://localhost:<PORT>`.

## API Endpoints

### Product Routes

#### 1. Create a Product

- **Endpoint:** `POST /prod/postProduct`
- **Description:** Create a new product.

#### 2. Get Products

- **Endpoint:** `GET /prod/getProducts`
- **Description:** Retrieve all products.

#### 3. Update a Product

- **Endpoint:** `PUT /prod/updateProduct/:productId`
- **Description:** Update a product by ID.

#### 4. Delete a Product

- **Endpoint:** `DELETE /prod/deleteProduct/:productId`
- **Description:** Delete a product by ID.

## Additional Information

- The home route (`/`) provides a welcome message to confirm that the API is running.
