const nJwt = require('njwt');
const helper = require('./functions');

/**
 * This example provides a way to show how can
 * 1) Create a Signing Key
 * 2) Create a JWT token with that signing key and a claims JSON object
 * 3) Validate the JWT against the signing key previously created
 * 
 * This project is based on https://github.com/jwtk/njwt
 */

// Create a signing key
// Please be aware that to be able to generate several JWT token and verify them. You only need to create ONE signing key.
var signingKey = helper.createSigningKey();
console.log(`signing key: ${signingKey} \n`);

// Create a `claims` object 
var claims = {
    iss: "http://myapp.com/",  // The URL of your service
    sub: "users/user1234",    // The UID of the user in your system
    scope: "self, admins",
    aud: "app-id" // Your APP ID
};

// Create a token
// By default the expiration is set to 1 hour but it could be modified by passing a Date in the parameters
// By default the response will return the JWT String token
var jwt = helper.createToken(claims, signingKey);
console.log(`JWT token: ${jwt} \n`);

// Verify the token (please be aware that the token should be sent in encoded format - compacted)
nJwt.verify(jwt, signingKey, function (err, verifiedJwt) {
    if (err) {
        console.log(err); // Token has expired, has been tampered with, etc
    } else {
        console.log(verifiedJwt); // Will contain the header and body
    }
});