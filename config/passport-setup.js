const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.serializeUser((user,done)=>{
done(null,user);
});

passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL:'/auth/google/redirect',
        clientID:'131070456515-i5d4j5gdbikjv2tvnv0n7lsuqvbid53u.apps.googleusercontent.com',
        clientSecret:'ykLwknbXAx-OK_vO48CoK-4O'
    },(req,accessToken,refreshToken,profile,done)=>{
        //passpot callback function
        console.log('passport callback function fired');
        
        console.log(" profile familyName = "+profile.name.familyName);
        console.log(" profile givenName = "+profile.name.givenName);
        console.log("gmail : "+profile.emails[0].value);
        console.log("Display Name : "+profile.displayName);
        console.log("familyname : "+profile.photos[0].value);
        
        done(null,profile);
       })
)