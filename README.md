# Brian Denney Form Challenge


## Workflow

### Step 1

- [x] Create a new project with the following files
  - [x] index.html
  - [x] app.js
  - [x] index.css

- [x] Create a form in the `index.html` with the following fields
  - [x] Input with first name
  - [x] Input with last name
  - [x] Text area for comments
  - [x] Checkbox to subscribe to a newsletter
  - [x] Input for an email
  - [x] Submit button

### Step 2

- [x] Disable the submit button initially
- [x] The button should only be enabled if
  - [x] First name and last name have at least 1 letter in the text box
- [x] Hide the input for an email initially
- [x] The input for email should be displayed if
  - [x] The checkbox is checked

### Step 3

- [x] After clicking submit
  - [x] Make a POST request to https://jsonplaceholder.typicode.com/users
    - [x] The request object should follow this structure { firstName, lastName, isSubscribed, email, comment }
    - [x] The email property should only be sent IF they have checked the box to subscribe
    - [x] If the request is successful
      - [x] Display a success message that disappears after 2 seconds (e.g. ‘Thanks for your submission <FirstName>’
      - [x] Clear all form fields
    - [x] If the request is NOT successful
      - [x] Display a failure message (e.g. ‘Oops something went wrong’)
      - [x] Do NOT clear all fields
