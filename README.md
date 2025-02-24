# Full-Stack Coding Solution Implementation

## Prerequisites

1. Node.js
2. npm
3. PostgreSQL database
4. Clone this repository by using the following command:

```bash
git clone https://github.com/simranmisra18/lumaa-spring-2025-swe.git
```
5. Go to the following folder path: lumaa-spring-2025-swe\task-manager-backend\backend. Run the following commands in this path:

```bash
npm install express cors bcryptjs jsonwebtoken pg dotenv
npm install --save-dev typescript ts-node nodemon @types/node @types/express
```
6. Go to the following folder path: lumaa-spring-2025-swe\task-manager-frontend. Run the following commands in this path:

```bash
npm install axios
npm install react-router-dom
```

## Steps to Setup the Database

1. Open your PostgreSQL instance, and create a new database with any name (eg. 'task_manager').
2. Go to the folder: lumaa-spring-2025-swe\task-manager-backend\backend.
3. Open the '.env' file. Replace the following in DATABASE_URL:
   - POSTGRES_USERNAME: Your PostgreSQL username.
   - YOUR_PASSWORD: Your PostgreSQL database password.
   - localhost: Keep it as 'localhost' if you're running PostgreSQL locally. Otherwise, use the appropriate URL.
   - 5432: By default, the PostgreSQL runs on port 5432. If your PostgreSQL runs on a different port, change it accordingly.
   - DATABASE_NAME: Name of the database that you created in PostgreSQL in the earlier step.
4. Go to the folder: lumaa-spring-2025-swe\task-manager-backend\backend\src. Open the 'app.module.ts' file, and replace the following under imports:
   - host: Keep it as 'localhost' if you're running PostgreSQL locally. Otherwise, use the appropriate URL.
   - port: By default, the PostgreSQL runs on port 5432. If your PostgreSQL runs on a different port, change it accordingly.
   - username: Your PostgreSQL username.
   - password: Your PostgreSQL database password.
   - database: Name of the database that you created in PostgreSQL in the earlier step.
5. The above steps would ensure connection to PostgreSQL and the database, and all the required tables would be automatically created in the database.

## Run the Backend (Port 3000)

Pre-requisites: Make sure there are no other services running on port 3000.
1. Open the following path on Powershell/command prompt/shell: lumaa-spring-2025-swe\task-manager-backend\backend.
2. Run the command: npm run start. This should start the backend successfully on port 3000.

## Run the Frontend (Port 3001)

Pre-requisites: Make sure there are no other services running on port 3001.
1. Open the following path on Powershell/command prompt/shell: lumaa-spring-2025-swe\task-manager-frontend.
2. Run the command: npm start. There might be an error in the powershell or command prompt saying there's already another service running on port 3000 (which is the backend service already running), it would ask you if you would like to run it on a different port. Type 'y' to answer yes. This should start the frontend successfully on port 3001.
3. The service should start running at: "http://localhost:3001". If it didn't start automatically, then open any browser and hit this URL. You should be able to see the Login page.

## Relevant Notes on Testing

1. The first page displayed after hitting the URL "http://localhost:3001" should be the Login Page.
2. The login page should ask for the username and password. Entering the wrong username and password should not log you in. Successful login should open the Tasks page for that user.
3. For registering a new user, click on 'Register here' link. This should redirect you to the Registration page.
4. The Registration page consists of Username, Password and Confirm Password fields. Entering a duplicate username, or different passwords in the Password and Confirm Password fields should not register the user. Succussful Registration should show the alert of successful registration. You can now login using the registered user.
5. On the Tasks Page, only the tasks added by the logged in user should be displayed. New tasks can be added and existing tasks can be edited or deleted. Editing tasks involve editing the Title, Description, and checking or unchecking the Mark as Complete checkbox.
6. Clicking on the Logout button should logout the user and take you back to the login page.
7. Try opening the URL "http://localhost:3001/tasks" in an incognito window where the JWT token is not saved. There should be an error message shown in the alerts saying you need to login first. Try logging in using an incorrect JWT token. You should not be able to login.

Note: No automated test suite is included due to the minimal nature of this challenge, but the code is structured so that you could easily add integration/unit tests as needed.

## Salary Expectations Per Month

I'm flexible with the salary, with my approximate expectation be: $2400/month.

## Video Demo

Here is the Google Drive Link of the demo video: https://drive.google.com/file/d/1AULg-fGlg_T4Aty-y7ny-Ch6N7OOTu-X/view?usp=sharing
