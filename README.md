# Cryptor
####  Messages encrypt and decryptor

### Features

- Generate a private key to safely encrypt your messages
- Save your encrypted message to the cloud
- Access and decrypt your encrypted message at any point and time using the previously generated private key

A demo for the application can be found [here](https://encryptor-app.herokuapp.com/)

### Stack And Libraries
- **Front End:** React
- **Back End:** Node.js + Express.js
- **Database:** MySQL

### Installation
Clone the repository

`$ git clone https://github.com/MilesTheEdgy/cryptor.git cryptor`

Go into the directory

`$ cd cryptor`

Install the dependencies

`$ npm i`

After that you can immediatly run the project by doing

`$ npm start`

Or if you would like to make changes to the files, run it with

`$ npm run startdev`

This will start the project with nodemon, which will listen to any active changes in the directory.

The react build is already pushed to the repository. If you would like to make changes to the front end, make sure to cd to client directory, run `$ npm i` to install the dependencies, then `$ npm start`

### Further Information

In both the front and back end, the majority of the functions are documented with jsdoc to help better explain what they do.

The server side has been unit tested and full integration tested.

You can verify that by running this command in the repository

`$ npm test`

This command will start jest in watchAll mode, which will find all test files in the directory and run them. I have added certain flags to customize the testing experience, such as verbose to show further test details, setTimeout to extend the default timeout and runInBand to run the tests sequentially.

### Disclaimer

I created this encryption algorithm for fun to see if I can create one, it is by no means safe to use and does not compete with current popular algorithms.

### Thank you for reading!
