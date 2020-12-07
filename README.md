# Web Project - Behaviour Reporting Application

## Required Database Tables:

~~~~sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE morning_reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id), 
    reporting_date DATE NOT NULL DEFAULT CURRENT_DATE,
    sleep_duration NUMERIC(4,2),
    sleep_quality SMALLINT,
    generic_mood SMALLINT
);

CREATE UNIQUE INDEX ON morning_reports(reporting_date);

CREATE TABLE evening_reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id), 
    reporting_date DATE NOT NULL DEFAULT CURRENT_DATE,
    sports_and_exercise_duration NUMERIC(4,2),
    studying_duration NUMERIC(4,2),
    regularity_and_quality_eating SMALLINT,
    generic_mood SMALLINT
);

CREATE UNIQUE INDEX ON evening_reports(reporting_date);
~~~~

## Tasks:

1. Application structure

- [x] Application divided into logical folders (akin to the part on Structuring Web Applications)
- [x] Dependencies exported from deps.js
- [x] Project launched from app.js, which is in the root folder
- [x] Configurations in a separate folder (e.g. config)
  - [x] Test configurations separate from production configurations
  - [ ] Configurations loaded from environmental variables or e.g. dotenv -files
  
2. Users

- [x] Email and password stored in the database for each user
  - [x] Password not stored in plaintext format
  - [x] Emails must be unique (same email cannot be stored twice in the database)
- [x] Users can register to the application
- [x] Registration form is accessible at /auth/registration
  - [x] Registration uses labels to clarify the purpose of the input fields
  - [x] Registration form is validated on the server
    - [x] Email must be an authentic email
    - [x] Password must contain at least 4 characters
    - [x] Validation errors shown on page
    - [x] In case of validation errors, email field is populated (password is not)
- [x] User-specific functionality is structured into logical parts (e.g. userController.js, userService.js)

3. Authentication

- [x] Application uses session-based authentication
- [x] Login form is accessible at /auth/login
  - [x] Login form asks for email and password
  - [x] Login uses labels to clarify the purpose of the input fields
  - [x] Login form has a link to the registration form
  - [x] If the user types in an invalid email or password, a message "Invalid email or password" is shown on the login page.
    - [x] Form fields are not populated
- [x] Authentication functionality is structured into logical parts (e.g. authController.js or part of userController.js, ...).
- [x] Application has a logout button that allows the user to logout (logging out effectively means clearing the session)
  - [x] Logout functionality is at /auth/logout
  
4. Middleware

- [x] The application has middleware that logs all the errors that occurred within the application
- [x] The application has middleware that logs all requests made to the application
  - [x] Logged information contains current time, request method, requested path, and user id (or anonymous if not authenticated)
- [x] The application has middleware that controls access to the application
  - [x] Paths starting with /auth are accessible to all
  - [x] Other paths require that the user is authenticated
    - [x] Non-authenticated users are redirected to the login form at /auth/login
- [x] Application has middleware that controls access to static files
  - [x] Static files are placed under /static
- [x] Middleware functionality is structured into logical parts (e.g. separate middlewares folder).

5. Reporting

- [x] Reporting functionality is available under the path /behavior/reporting
- [x] Reporting cannot be done if the user is not authenticated
- [x] When accessing /behavior/reporting, user can choose whether morning or evening is being reported
  - [x] User reporting form depends on selection
  - [x] Page at /behavior/reporting shows whether morning and/or evening reporting for today has already been done
- [x] Morning reporting form contains fields for date, sleep duration, sleep quality, and generic mood
  - [x] Date is populated by default to today, but can be changed
    - [x] Form has a date field for selecting the date
  - [x] Sleep duration is reported in hours (with decimals)
  - [x] Sleep quality and generic mood are reported using a number from 1 to 5, where 1 corresponds to very poor and 5 corresponds to excellent.
    - [x] Form has a slider (e.g. range) or radio buttons for reporting the value
  - [x] Form contains labels that clarify the purpose of the input fields and the accepted values
  - [x] Form fields are validated
    - [x] Sleep duration must be entered, must be a number (can be decimal), and cannot be negative
    - [x] Sleep quality and generic mood must be reported using numbers between 1 and 5 (integers).
    - [x] In case of validation errors, form fields are populated
- [x] Evening reporting form contains fields for date, time spent on sports and exercise, time spent studying, regularity and quality of eating, and generic mood
  - [x] Date is populated by default to today, but can be changed
    - [x] Form has a date field for selecting the date
  - [x] Time spent on sports and exercise and time spent studying are reported in hours (with decimals)
  - [x] Regularity and quality of eating and generic mood are reported using a number from 1 to 5, where 1 corresponds to very poor and 5 corresponds to excellent.
    - [x] Form has a slider (e.g. range) or radio buttons for reporting the value
  - [x] Form contains labels that clarify the purpose of the input fields and the accepted values
  - [x] Form fields are validated
    - [x] Time spent on sports and exercise and time spent studying are reported in hours must be entered, must be a number (can be decimal), and cannot be negative
    - [x] Regularity and quality of eating and generic mood must be reported using numbers between 1 and 5 (integers).
    - [ ] In case of validation errors, form fields are populated
- [x] Reported values are stored into the database
  - [x] The database schema used for reporting works for the task
  - [x] Reporting is user-specific (all reported values are stored under the currently authenticated user)
  - [x] If the same report is already given (e.g. morning report for a specific day), then the older report is removed
    - [x] If the functionality for handling duplicate reports is something else, the functionality is described in documentation
- [x] Reporting functionality structured into logical parts (separate views folder, separate controller for reporting, service(s), ...)

6. Summarization

- [x] Summary functionality is available under the path /behavior/summary
- [x] Main summary page contains the following statistics, by default shown for the last week and month
  - [x] Weekly average (by default from last week)
    - [x] Average sleep duration
    - [x] Average time spent on sports and exercise
    - [x] Average time spent studying
    - [x] Average sleep quality
    - [x] Average generic mood
  - [x] Monthly average (by default from last month)
    - [x] Average sleep duration
    - [x] Average time spent on sports and exercise
    - [x] Average time spent studying
    - [x] Average sleep quality
    - [x] Average generic mood
- [x] Summary page has a selector for week and month. Check input type="week" and input type="month".
  - [x] When the week is changed, the weekly average will be shown for the given week.
  - [x] When the month is changed, the monthly average will be shown for the given month.
  - [x] If no data for the given week exists, the weekly summary shows text suggesting that no data for the given week exists.
  - [x] If no data for the given month exists, the monthly summary shows text suggesting that no data for the given month exists.
- [x] Summary data / averages calculated within the database
  - [x] When doing weekly reporting, the weekly averages are calculated in the database
  - [x] When doing monthly reporting, the monthly averages are calculated in the database
- [x] Summarization page contains statistics only for the current user.

7. Landing page (i.e. page at the root path of the application)

- [x] Landing page briefly describes the purpose of the application
- [x] Landing page shows a glimpse at the data and indicates a trend
  - [x] Landing page shows users' average mood for today and and yesterday
  - [x] If the average mood yesterday was better than today, tells that things are looking gloomy today
  - [x] If the average mood yesterday was was worse today, tells that things are looking bright today
- [x] Landing page has links / buttons for login and register functionality
- [x] Landing page has links / buttons for reporting functionality

8. Testing

- [ ] The application has at least 5 meaningful automated tests. All tests detect if e.g. tested functionality is changed so that it no longer works as expected.
- [ ] The application has at least 10 meaningful automated tests. All tests detect if e.g. tested functionality is changed so that it no longer works as expected.
- [ ] The application has at least 15 meaningful automated tests. All tests detect if e.g. tested functionality is changed so that it no longer works as expected.
- [ ] The application has at least 20 meaningful automated tests. All tests detect if e.g. tested functionality is changed so that it no longer works as expected.

9. Security

- [x] Passwords are not stored in plaintext
- [x] Field types in the database match the actual content (i.e., when storing numbers, use numeric types)
- [x] Database queries done using parameterized queries (i.e., code cannot be injected to SQL queries)
- [x] Data retrieved from the database are sanitized (i.e., if showing content from database, using <%= ... %> instead of <%- ...%> unless explicitly stated what for).
- [x] Users cannot access data of other users.
- [x] Users cannot post reports to other users' accounts.

10. Database
- [x] Expensive calculations such as calculating averages are done in the database
- [x] Indices are used when joining tables if the queries are such that they are used often
- [x] Database uses a connection pool
- [ ] Database credentials are not included in the code

11. User interface / views

- [x] Views are stored in a separate folder
- [x] User interface uses partials for header content
- [x] User interface uses partials for footer content
- [x] Recurring parts are separated into own partials (e.g. partial for validation errors)
- [x] Pages with forms contain functionality that guides the user
  - [x] Labels are shown next to form fields so that the user knows what to enter to the form fields
  - [x] Form fields are validated and user sees validation errors close to the form fields
  - [x] In the case of validation errors, form fields are populated (with the exception of the login page)
- [x] User interface uses a style library or self-made stylesheets (see e.g. Twitter Bootstrap for a style library)
  - [x] If Twitter Bootstrap or other external style libraries are used, they are used over a content delivery network
- [ ] Different pages of the application follow the same style
- [x] User sees if the user has logged in (e.g. with a message 'Logged in as my@email.net' shown at the top of the page)

12. APIs

- [x] The application provides an API endpoint for retrieving summary data generated over all users in a JSON format
- [x] The API is accessible by all
- [x] The API allows cross-origin requests
- [x] Endpoint /api/summary/ provides a JSON document with averages for sleep duration, time spent on sports and exercise, time spent studying, sleep quality, and generic mood for each day over the last 7 days
- [x] Endpoint /api/summary/:year/:month/:day provides a JSON document with averages for sleep duration, time spent on sports and exercise, time spent studying, sleep quality, and generic mood for the given day

13. Deployment

- [ ] Application is available and working in an online location (e.g. Heroku) at an address provided in the documentation
- [ ] Application can be run locally following the guidelines in documentation

14. Documentation

- [x] Documentation contains necessary CREATE TABLE statements needed to create the database used by the application
- [ ] Documentation contains the address at which the application can currently be accessed
- [ ] Documentation contains guidelines for running the application
- [ ] Documentation contains guidelines for running tests
