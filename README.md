
README for Blog API Project
Project Description
This project is a Blog API where users can read posts, and registered users can create posts. Admins have the authority to delete posts and users, while authors can edit and delete their own posts. The API is built using Express.js and connects to a MongoDB database.

Features
Read Posts: All users (both registered and unregistered) can read blog posts.
Create Posts: Only registered and authenticated users can create new blog posts.
Edit Posts: Authors can edit their own posts.
Delete Posts: Authors can delete their own posts.
Admin Privileges: Admins can delete any post and manage users.

Installation
Clone the repository:
git clone https://github.com/yourusername/blog-api.git
cd blog-api
Install dependencies:
npm install
Set up environment variables:
Create a .env file in the root directory and add the following:

env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=m
SECRET_TOKEN_KEY=
APP_PORT=
APP_HOST=


Run the application:
npm start

API Endpoints
Auth Routes
Register: POST /api/auth/register
Login: POST /api/auth/login
Post Routes
Get All Posts: GET /api/posts
Create Post: POST /api/posts (Authenticated users only)
Get Post by ID: GET /api/posts/:id
Update Post: PUT /api/posts/:id (Author only)
Delete Post: DELETE /api/posts/:id (Author or Admin only)
User Routes
Get All Users: GET /api/users (Admin only)
Get User by ID: GET /api/users/:id (Admin only)
Delete User: DELETE /api/users/:id (Admin only)
Contact Routes
Get All Contacts: GET /api/contacts
Middleware
Authentication Middleware: Used to protect routes that require user authentication.

Database Configuration
The database configuration is handled in config/mongo.js. Ensure MongoDB is running and the connection details are correctly specified in the .env file.

Running the Application
To start the application, use the following command:
npm start
The application will be accessible at the port specified in the .env file.

Example Usage
Creating a Post
Register a new user by sending a POST request to /api/auth/register with the user details.
Log in with the registered user by sending a POST request to /api/auth/login.
Use the token received from the login response to authenticate subsequent requests.
Create a post by sending a POST request to /api/posts with the post data.
Error Handling
Errors are handled using custom middleware in helpers/errors/requestError.js. Ensure proper error messages and status codes are returned for various error scenarios.

License
This project is licensed under the MIT License.