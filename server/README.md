# Guess the Number - Server

## Prerequisites
- Node.js version 18 or higher
- NPM (Node Package Manager)

## Installation

To set up the project, follow these steps:
```bash
cd server
npm install
```

## Database Setup
### Microsoft SQL Server
- Make sure you have Microsoft SQL Server installed and running.
- Create a new database for the game application.

### Environment Configuration
Create a .env file in the server directory, add the following configuration for connecting to the SQL Server database:

```env
DB_SERVER=your_database_server_address
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name
```

## Database Schema

### `games` Table

- `game_id` (UniqueIdentifier): Unique identifier for each game.
- `random_number` (Integer): The randomly generated number for the game.
- `finished` (Bit/Boolean): Indicates whether the game is finished (0 for not finished, 1 for finished).

### Prisma
Prisma is an ORM (Object-Relational Mapping) tool that simplifies database operations and interactions in Node.js applications. In this project, Prisma is used to manage the database and interact with the Microsoft SQL Server. It provides a type-safe way to query the database and perform CRUD (Create, Read, Update, Delete) operations without writing raw SQL queries.

The Prisma configuration is defined in the [schema.prisma](./prisma/schema.prisma) file. This configuration specifies the data model and database connection details.


## Configuration
### Firebase SDK
Go to your Firebase project to the Service Account tab under Project Settings and generate a new key. Paste this key in the .env file
```env
SERVICE_ACCOUNT_KEY=your_service_account_key
```

## Development
To start the server side of the project run the following command:

```bash
npm start
```

## Dependencies

Below are the dependencies used in this project:

```json
{
  "@prisma/client": "^5.2.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "firebase-admin": "^11.10.1",
    "mssql": "^9.1.3",
    "nodemon": "^3.0.1",
    "prisma": "^5.2.0",
    "uuid": "^9.0.0"
}
```