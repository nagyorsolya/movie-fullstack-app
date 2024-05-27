# Movie fullstack app

This web app accesses the The Movie Database and lets you look up movies by their title

## Running the Backend

### Using Docker Compose

To run the backend with Docker Compose, follow these steps:

1. Build the Docker images and start the containers:
   `docker-compose up --build`

2. Run the necessary installations and then start the server:
   ` npm run i`
   `npm run dev`

## Environment variables

The following environment variables are required to run the backend:

PORT: The port number on which the server will listen.
DB_PW: The password for connecting to the database.
API_URL: The URL of the external API, should be https://api.themoviedb.org/3/search/movie to access The Movie Database
API_KEY: The API key required for accessing the external API.

## Running the Frontend

To run the frontent, follow these steps:

1. Run the necessary installations:
   `npm i`
2. Start the app:
   `npm start`

## Environment variables

The following environment variables are required to run the frontend:
REACT_APP_API_URL=
(the backend runs on localhost:8080 by default).

## Running tests

To run the tests, run npm run test in movie-fullstack-app/frontend or movie-fullstack-app/backend folder
