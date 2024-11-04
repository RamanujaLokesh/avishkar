import passport from 'passport'
import pool from "./dbConfig.js";
import passportJwt  from 'passport-jwt';


var JwtStrategy = passportJwt.Strategy;
var ExtractJwt  = passportJwt.ExtractJwt;



var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'yourSecretKey',
    issuer: 'dev.yoursite.com',
    audience: 'dev.yoursite.com'
};

passport.use( new JwtStrategy(opts ,async (jwt_payload , done)=>{
    try {
        const result = pool.query("SELECT * FROM student_details WHERE reg_no = $1;", [jwt_payload.sub]);
        const user = result.rows[0];
        if(user){
            return done(null,user);
        }else{
            return done(null , false);
        }
    } catch (error) {
        return done(error, false);
    }
    
}))




