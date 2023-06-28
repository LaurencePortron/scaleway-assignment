**To start the application, follow these steps:**

1. Install Dependencies:

   - Run the following command to install the project dependencies:
     ```
     npm install
     ```

2. Start the Application:

   - Run the following command to start the application:
     ```
     npm run dev
     ```
   - This command will start both server and client and are be accessible at a specific URL (client: `http://127.0.0.1:5173/`, server: `http://localhost:8000`).

3. Run tests:
   - Run the following commands to run tests:
   ```
    npm run test
   ```

**User Story**
(This assignement took me approximately 4-5 days.)

As a user,
I want to be able to manage servers effectively,
So that I can easily create, list, and view server details.

**Acceptance Criteria:**

- As a user, I should be able to create a new server by providing its name, type, and status.
- As a user, I should be able to list all existing servers with their relevant information.
- As a user, I should be able to view detailed information about a specific server.
- When listing servers, the system should display them in a sortable format, allowing me to reorder them by each available column in ascending or descending order.
- While the server list is being fetched, the system should display a loading indicator to notify the user that the data is being loaded.

**Additional Considerations:**

- The UI should be intuitive and user-friendly, allowing users to easily navigate between different pages and perform actions without confusion.
- Automated tests should be implemented to ensure the functionality of server creation, listing, and viewing.

# API Documentation

## Base URL

The base URL for all API endpoints is: `http://localhost:8000`

## Endpoints

### 1. Create a Server

Endpoint: `/api/server`

Method: `POST`

Description: Create a new server.

- Request body:
  ```
  {
    "name": "Server 1",
    "type": "medium",
    "status": "running"
  }
  ```
- Response:
  ```
  {
    "id": "12345",
    "name": "Server 1",
    "type": "medium",
    "status": "running"
  }
  ```

### 2. List Servers

Endpoint: `/api/servers`

Method: `GET`

Description: Fetch a list of servers.

- Response:

```

[
{
"id": "12345",
"name": "Server 1",
"type": "medium",
"status": "running"
},
{
"id": "67890",
"name": "Server 2",
"type": "small",
"status": "stopped"
}
]

```

### 3. Get Server Details

Endpoint: `/api/server/{id}`

Example: `GET /api/server/12345`

Method: `GET`

Description: Fetch detailed information about a specific server.

Response:

```

{
"id": "12345",
"name": "Server 1",
"type": "medium",
"status": "running",
}

```
