const express = require('express'),
    app = express();
// Modules to validate JWTs
jwt = require('express-jwt'),
    jwks = require('jwks-rsa');

require('dotenv').config();

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        jwksUri: `https://login.microsoftonline.com/${process.env.TENANT_ID}/discovery/v2.0/keys`
    }),
    algorithms: ['RS256']
})

app.use(jwtCheck);

//Modules to use passport
// const passport = require('passport'),
//     JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt,
//     jwks = require('jwks-rsa');

// let jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
//     secretOrKeyProvider: jwks.passportJwtSecret({
//         jwksUri: `https://login.microsoftonline.com/${process.env.TENANT_ID}/discovery/v2.0/keys`,
//     }),
//     algorithms: ['RS256'],
//     // Validate the audience and the issuer.
//     // audience: "api://my-api",
//     // issuer: `https://sts.windows.net/${process.env.TENANT_ID}/`
// };


// const verify = (jwt_payload, done) => {
//     console.log(`Signature is valid for the JSON Web Token (JWT), let's check other things...`);
//     console.log(jwt_payload);

//     if (jwt_payload && jwt_payload.sub) {
//         return done(null, jwt_payload);
//     }

//     return done(null, false);
// };

// passport.use(new JwtStrategy(jwtOptions, verify));


// app.get("/protected", passport.authorize('jwt', { session: false }), function(req, res) {
app.get("/protected", function(req, res) {
    res.json({ message: "This message is protected" });
});

app.listen(1000, () => {
    console.log(`API running on port 1000!`);
});