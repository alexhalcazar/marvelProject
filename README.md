# Marvel Project

A web application that uses express.js, and integrates a Marvel API.  
It also interacts with a MongoDB database.

## Installation

1. Clone the Repository:

```bash
git clone https://github.com/alexhalcazar/marvelProject.git
cd marvelProject
```

2. Install Dependencies for the entire project:

```bash
npm install
```

## Usage

3. Start the Marvel Project server

```bash
npm start
```

This command should now be executed within the 'marvelProject' folder.

## Required API Keys and Environment Setup

This project depends on external APIs and services. To run the project locally, you will need to:

### Marvel Developer Account

1. Go to [Marvel Developer Account](https://developer.marvel.com) and sign up for a free account.
2. Once logged in, generate your public and private API keys.
3. Add the following to your .env file:

```
MARVEL_PUBLIC_KEY=your_public_key_here
MARVEL_PRIVATE_KEY=your_private_key_here
```

### MongoDB

1. Set up a [MongoDB Atlas](https://www.mongodb.com)
2. Add your MongoDB Username and Password to .env

```
DB_USER=your_username_here
DB_PASSWORD=your_password_here
```

## Local Development and Deployment

This project is set up to run locally using Vite and Express. API requests are routed to a third-party service  
(e.g., AWS Lambda) via a base URL defined in a .env file.  
If you're deploying your own version of this project, you'll need to:

1. Host your own backend endpoint (e.g., using AWS Lambda or another backend service)
2. Update the .env file with your own API_BASE_URL

```
API_BASE_URL=your_api_endpoint_here
```

## Access the Marvel Project server

Open your web browser and navigate to [local host](http://localhost:3000). <br>
You can use this server to explore and interact with the website.

## Deployment

The Marvel Project was launched using **AWS Services**:

1. Frontend: Hosted on AWS S3 as a static website.
2. Backend: Refractored to run as AWS Lambda functions and exposed via AWS API Gateway.
3. Database: The backend connects to a MongoDB Atlas cluster for data storage.

You can access the deployed web application using the following link:  
[marvel-project](http://www.marvel-project.com).

## Reporting Issues

If you encounter any issues or have suggestions for improvement, please [create an issue](https://github.com/alexhalcazar/marvelProject/issues)

## Authors

Alex Alcazar
