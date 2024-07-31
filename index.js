const nJwt = require("njwt");
const helper = require("./functions");
const app = require("./realmApp");

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
  iss: "http://myapp.com/", // The URL of your service
  sub: "users/user2345", // The UID of the user in your system
  scope: "self, admins",
  aud: "<app_id>", // Your APP ID
  // Metadata fiels (optional). For more information, click here: https://www.mongodb.com/docs/atlas/app-services/authentication/custom-jwt/#metadata-fields
  user_data: {
    name: "josman",
    email: "test@test.com",
  },
};

// Create a token
// By default the expiration is set to 1 hour but it could be modified by passing a Date in the parameters
// By default the response will return the JWT String token
var jwt = helper.createToken(claims, signingKey);
var login = true;
if (login == true) {
  const credentials = Realm.Credentials.jwt(jwt);
  app.logIn(credentials);
  console.log(`JWT token: ${jwt} \n`);
} else {
  console.log("The user is already logged in or you set login to false");
}

// Verify the token (please be aware that the token should be sent in encoded format - compacted)
nJwt.verify(jwt, signingKey, function (err, verifiedJwt) {
  if (err) {
    console.log(err); // Token has expired, has been tampered with, etc
  } else {
    console.log(verifiedJwt, "verified token"); // Will contain the header and body
  }
});
