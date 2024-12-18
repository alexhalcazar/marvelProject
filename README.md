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

## Access the Marvel Project server

Open your web browser and navigate to [local host](http://localhost:3000). <br>
You can use this server to explore and interact with the website.

## Deployment

The Marvel Project was launched using **AWS Services**:

1. Frontend: Hosted on AWS S3 as a static website.
2. Backend: Refractored to run as AWS Lambda functions and exposed via AWS API Gateway.
3. Database: The backend connects to a MongoDB Atlas cluster for data storage.

You can access the deployed web application using the following link:  
[marvel-project](http://marvel-project.com).

## Reporting Issues

If you encounter any issues or have suggestions for improvement, please [create an issue](https://github.com/alexhalcazar/marvelProject/issues)

## Authors

Alex Alcazar

## TODOS

<ul>
    <li>Add Pagination for displaying cards</li>
    <li>Implement sorting and filtering for snap cards</li>
    <li>Improve the frontend</li>
</ul>
