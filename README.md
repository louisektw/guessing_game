# Guess the Number

Welcome to **Guess the Number**! This project brings you the classic "Guess the Number" game in a digital form, split into two components: the client and the server. Whether you're a player looking to test your guessing skills or a developer interested in exploring the implementation details, this README will guide you through the project.

## Game Description

### Client (Frontend)

The **Client** component of the game is built using React with TypeScript and leverages Firebase Authentication for user authentication. Here's how to set it up and get started:

- **Tech Stack**: React with TypeScript, Firebase Authentication, Axios

To install and run the Client, refer to the [Client README](client/README.md).

### Server (Backend)

The **Server** component serves as the game host, managing game logic and providing authenticated REST APIs for the player. It uses Express.js for the server, Firebase Admin SDK for authentication, and Microsoft Azure for hosting. If you're interested in the server-side implementation, here's what you need to know:

- **Tech Stack**: Express.js, Firebase Admin SDK, Microsoft Azure

To install and run the Server, follow the instructions in the [Server README](server/README.md).

## Game Improvements
To enhance this game further, these following improvements can be implemented:

### 1. Players Table in the Database
Introduce a `players` table in the database to manage player information. Each player can have their own record in this table, which would include details such as a unique player ID, username, and other relevant player-related data. Associating players with their own records allows for better player management and personalized gaming experiences.

### 2. Player-Game Association
Establish a relationship between players and the games they participate in. This association can be done using foreign keys in the database to link each player to their active game. This approach eliminates the dependency on cookies for tracking active game sessions.


