# QUICK CREDIT
[![Build Status](https://travis-ci.org/tobslob/quickcreditapp.svg?branch=develop)](https://travis-ci.org/tobslob/quickcreditapp.svg?branch=develop) 
[![Coverage Status](https://coveralls.io/repos/github/tobslob/quickcreditapp/badge.svg?branch=develop)](https://coveralls.io/github/tobslob/quickcreditapp?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d7995a20fd0891275f98/maintainability)](https://codeclimate.com/github/tobslob/quickcreditapp/maintainability)

Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

## Required Features

- User (client) can **sign up**
- User (client) can **login**
- User (client) can **request for only one loan at a time**
- User (client) can **view loan repayment history, to keep track of his/her liability or responsibilities**
- User (client) can **update profile to meetup requirement after profile rejection**
- Admin can **mark a client as verified , after confirming his/her home and work address**
- Admin can **view a specific loan application**
- Admin can **approve or reject a client’s loan application**
- Admin can **post loan repayment transaction in favour of a client**
- Admin can **view all loan applications**
- Admin can **view all current loans (not fully repaid)**
- Admin can **view all repaid loans**

## Optional Features

- User can **reset password**
- **Real time email notification upon approval or rejection of a loan request**

## Technologies

- Node JS
- Express
- Mocha & Chai
- Joi
- ESLint
- Babel
- Travis CI
- Code Climate & Coveralls

## Requirements and Installation

To install and run this project you would need to have listed stack installed:

- Node Js
To run:


```sh
git clone <https://github.com/tobslob/quickcreditapp.git>
cd quickcreditapp
npm install
npm start
```

## Testing

```sh
npm test
```

## API-ENDPOINTS

- V1

`- POST /api/v1/auth/signup Create user account`

`- POST /api/v1/auth/signin Login a user`

`- GET /api/v1/user Get all user`

`- GET /api/v1/user/<:id> Get a user`

`- PATCH /api/v1/user/<:id> Update a user`

`- DELETE /api/v1/user/<:id> Delete a user`

`- POST /api/v1/loans Create a loan application`

`- GET /api/v1/loans/<:loan-id>/repayment View loan repayment history`

`- GET /api/v1/loans Get all loan applications`

`- GET /api/v1/loans?status=approved&repaid=false Get all current loans that are not fully repaid`

`- GET /api/v1/loans?status=approved&repaid=true Get all repaid loans.`

`- PATCH /api/v1/users/<:user-email>/verify Mark a user as verified`

`- GET /api/v1/loans/<:loan-id> Get a specific loan application`

`- PATCH /api/v1/loans/<:loan-id> Approve or reject a loan application`

`- POST /api/v1/loans/<:loan-id>/repayment Create a loan repayment record`


## Pivotal Tracker stories

[https://www.pivotaltracker.com/n/projects/2326572](https://www.pivotaltracker.com/n/projects/2326572)

## Template UI

You can see a hosted version of the template at [https://tobslob.github.io/UI/](https://tobslob.github.io/UI/)

## API

The API is currently in version 1 (v1) and is hosted at
[https://quickcreditapp.herokuapp.com/](https://quickcreditapp.herokuapp.com/)

## API Documentation

[https://quickcreditapp.herokuapp.com/api-docs/](https://quickcreditapp.herokuapp.com/api-docs/)

## Author

Kazeem Oluwatobi Odutola

