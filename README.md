# Parking Entitlements Management System

This system manages parking entitlements for Jerusalem Municipality employees. The system is built with C# in the backend, Angular in the frontend, and uses SQL for the database.

## Features

- Efficiently manage parking entitlements for Jerusalem Municipality employees.
- Backend built with C# for robust and scalable operations.
- Frontend built with Angular for a responsive and user-friendly interface.
- SQL database for data storage and retrieval.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- [.NET SDK](https://dotnet.microsoft.com/download) for backend development.
- [Node.js](https://nodejs.org/) and [Angular CLI](https://cli.angular.io/) for frontend development.
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) for the database.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/parking-entitlements.git
    cd parking-entitlements
    ```

2. Install backend dependencies:

    ```bash
    cd backend
    dotnet restore
    ```

3. Install frontend dependencies:

    ```bash
    cd frontend
    npm install
    ```

## Configuration

1. Configure the database connection in the backend. Update the `appsettings.json` file with your database details.

2. Configure the frontend. Update the `environment.ts` file in the `src/environments` directory with the backend API endpoint.

## Usage

1. Run the backend:

    ```bash
    cd backend
    dotnet run
    ```

2. Run the frontend:

    ```bash
    cd frontend
    ng serve
    ```

3. Open your browser and navigate to `http://localhost:4200` to access the application.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
