# Web Project - Behaviour Reporting Application

## Tasks:

1. Application structure

- [ ] Application divided into logical folders (akin to the part on Structuring Web Applications)
- [ ] Dependencies exported from deps.js
- [ ] Project launched from app.js, which is in the root folder
- [ ] Configurations in a separate folder (e.g. config)
  - [ ] Test configurations separate from production configurations
  - [ ] Configurations loaded from environmental variables or e.g. dotenv -files
  
2. Users

- [ ] Email and password stored in the database for each user
  - [ ] Password not stored in plaintext format
  - [ ] Emails must be unique (same email cannot be stored twice in the database)
- [ ] Users can register to the application
- [ ] Registration form is accessible at /auth/registration
  - [ ] Registration uses labels to clarify the purpose of the input fields
  - [ ] Registration form is validated on the server
    - [ ] Email must be an authentic email
    - [ ] Password must contain at least 4 characters
    - [ ] Validation errors shown on page
    - [ ] In case of validation errors, email field is populated (password is not)
- [ ] User-specific functionality is structured into logical parts (e.g. userController.js, userService.js)

3. Authentication

- [ ] Application uses session-based authentication
- [ ] Login form is accessible at /auth/login
  - [ ] Login form asks for email and password
  - [ ] Login uses labels to clarify the purpose of the input fields
  - [ ] Login form has a link to the registration form
  - [ ] If the user types in an invalid email or password, a message "Invalid email or password" is shown on the login page.
    - [ ] Form fields are not populated
- [ ] Authentication functionality is structured into logical parts (e.g. authController.js or part of userController.js, ...).
- [ ] Application has a logout button that allows the user to logout (logging out effectively means clearing the session)
  - [ ] Logout functionality is at /auth/logout
  
4. Middleware

- [ ] The application has middleware that logs all the errors that occurred within the application
- [ ] The application has middleware that logs all requests made to the application
  - [ ] Logged information contains current time, request method, requested path, and user id (or anonymous if not authenticated)
- [ ] The application has middleware that controls access to the application
  - [ ] Paths starting with /auth are accessible to all
  - [ ] Other paths require that the user is authenticated
    - [ ] Non-authenticated users are redirected to the login form at /auth/login
- [ ] Application has middleware that controls access to static files
  - [ ] Static files are placed under /static
- [ ] Middleware functionality is structured into logical parts (e.g. separate middlewares folder).
