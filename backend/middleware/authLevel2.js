import jwt from 'jsonwebtoken'

const authLevel2 = (req,res,next) => {
    try {


        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "unauthorized - no token found" });

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - wrong token" })
        }

        const { iat, exp, ...filteredUser } = decoded;
        if(filteredUser.auth_level >=2){
            req.user = filteredUser;
            next();
        }else{
            return res.status(401).json({ error: "Unauthorized - wrong token" })
        }
    } catch (error) {
        console.log("error in protectRoute middleware: ", error.message)
        res.status(500).json({ error: "internal server error" });
    }
}

export default authLevel2