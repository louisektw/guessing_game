# Guess the Number - Client
## Prerequisites

Before you begin, make sure you have the following software installed:

- Node.js 18
- npm

## Installation

To set up the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/louisektw/guessing_game.git
cd client
npm install
```

## Configuration
### Firebase Authentication
To enable Firebase Authentication, you'll need to set up a Firebase project and obtain your Firebase configuration. Once you have it, create a `.env` file in the project root and add the following:

```env
REACT_APP_FIREBASE_API_KEY=<your-api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<your-project-id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
REACT_APP_FIREBASE_APP_ID=<your-app-id>
```
Replace the placeholders with your Firebase project information.

## Development
To start the development server, run the following command:

```bash
npm start
```
This will launch the development server and open the app in your default web browser. The app will automatically reload as you make changes to the code.

## Dependencies

Below are the dependencies used in this project:

```json
{
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0",
  "@fortawesome/fontawesome-svg-core": "^6.4.2",
  "@fortawesome/free-solid-svg-icons": "^6.4.2",
  "@fortawesome/react-fontawesome": "^0.2.0",
  "@mui/material": "^5.14.5",
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "@types/jest": "^27.5.2",
  "@types/node": "^16.18.43",
  "@types/react": "^18.2.21",
  "@types/react-dom": "^18.2.7",
  "axios": "^1.4.0",
  "firebase": "^10.3.0",
  "js-cookie": "^3.0.5",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.15.0",
  "react-scripts": "5.0.1",
  "styled-components": "^5.3.11",
  "typescript": "^4.9.5",
  "web-vitals": "^2.1.4"
}
```

## Scripts

- `npm start`: Starts the development server.
- `npm run build`: Builds the production-ready application.
