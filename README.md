# Postman-express

Nodejs application to quickly setup a mock serveur based on a Postman collection with Default json responses.

## Requirements

- Node.js: any version supported by [Express.JS](https://www.npmjs.com/package/express)

## Installation

First clone this repo then:

```bash
cd postman-express
```

and finally install it:

```bash
npm install
```

## Usage

In Postman, export your collection (should be a .json file).
Drop the json file into the folder `collections`

Run it :
```bash
npm run start
```

And you're done, the mock server API runs your Postman collections on: `http://localhost:4400`