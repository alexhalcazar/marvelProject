# Marvel Project

## Project Status

This project was built using the **official Marvel API**, which has since been discontinued.
As a result, the application is no longer able to fetch live Marvel data.

The repository is preserved for **educational and portfolio purposes** to demonstrate:
- Node.js + Express backend design
- Third-party API integration
- Serverless deployment using AWS Lambda
- MongoDB integration  

A web application built with Express.js that integrated the official Marvel API.
The application also interacts with a MongoDB database.

## Installation

Note: Due to the Marvel API being discontinued, the application will not return live data without modification.  

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

This project depends on external APIs and services.  

### Marvel Developer Account

### Legacy: Marvel API Keys (No Longer Active)

The original implementation required a Marvel Developer account and API keys.
Since the Marvel API is no longer supported, these keys can no longer be used to retrieve data.

This section is preserved to document the original authentication and request-signing approach.  

### MongoDB

1. Set up a [MongoDB Atlas](https://www.mongodb.com)
2. Add your MongoDB Username and Password to .env

```
DB_USER=your_username_here
DB_PASSWORD=your_password_here
```

## Local Development and Deployment


This project demonstrates a full-stack architecture using Vite, Express, and serverless backend services.  

While the original third-party API is no longer available, the infrastructure design (routing, environment variables, Lambda setup) remains relevant and reusable.  

## Access the Marvel Project server

Open your web browser and navigate to [local host](http://localhost:3000/views/index.html). <br>
You can use this server to explore and interact with the website.

## Deployment (Archived)

The project was previously launched using **AWS Services**:

1. Frontend: Hosted on AWS S3 as a static website.
2. Backend: Refractored to run as AWS Lambda functions and exposed via AWS API Gateway.
3. Database: The backend connects to a MongoDB Atlas cluster for data storage.

The live deployment has been taken down due to the Marvel API being discontinued.


## If Rebuilt Today

If this project were rebuilt today, the following improvements would be made:

- Abstract the data provider layer to allow API swapping
- Replace the Marvel API with mock or self-hosted data
- Add automated tests using mocked responses
- Improve error handling for third-party API failures

## Reporting Issues

If you encounter any issues or have suggestions for improvement, please [create an issue](https://github.com/alexhalcazar/marvelProject/issues)

## Authors

Alex Alcazar
