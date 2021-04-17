# Creating Secure, Signed JWTs for Node.js

This project is based on the [nJwt](https://github.com/jwtk/njwt) library for Node.js developers.
The aim of this project is to show how to create and test JWT token using your own signing key secret.

- [Features](#features)
- [Component Libraries](#component-libraries)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Considerations](#considerations)
- [License](#license)

## Features

- [x] Create Signing keys
- [x] Create a JSON token using the signing key
- [x] Validate the token

## Component Libraries

This project uses the libraries needed for nJwt to work

- `"njwt": "^1.0.0"`
- `"secure-random": "^1.1.2"`

## Requirements

- npm
- Node

## Installation

Download the repository and run `npm install` inside the directory to install the dependencies. 

## Usage

You will find to classes: 
- `functions.js`
- `index.js` 

The `index.js` file is a complete example of how to run the example to create and validate a JWT token 

You will first need to create a Signing key 

```js
const helper = require('./functions');
var signingKey = helper.createSigningKey();
```
Once having a singing key you could create a `JWT` token based on this. The only mandatory fields are a `JSON` **claims** object.

```js
var claims = {
    iss: "http://myapp.com/",  // The URL of your service
    sub: "users/user1234",    // The UID of the user in your system
    scope: "self, admins",
    aud: "app-id" // Your APP ID
};
```
Other optional fields are the algorithm used to encode the token (by default is `HS256`, the **expiration** date which is **1 hour** by default). You could find more about the parameters in the documentation of the method.

```js
var jwt = helper.createToken(claims, signingKey);
```

To verify the token you could run this function

```js
nJwt.verify(jwt, signingKey, function (err, verifiedJwt) {
    if (err) {
        console.log(err); // Token has expired, has been tampered with, etc
    } else {
        console.log(verifiedJwt); // Will contain the header and body
    }
});
```

## Considerations

- If you want to create several `JWT` tokens to validate against a `Signing Key`, use the same signing key to create the tokens. 

## License

Free use.