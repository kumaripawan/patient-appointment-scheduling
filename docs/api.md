# API Documentation

## User Endpoints

- `POST /add_user`: Adds a new user.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User added successfully!"
    }
    ```

- `GET /users`: Retrieves all users.
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      }
    ]
    ```
