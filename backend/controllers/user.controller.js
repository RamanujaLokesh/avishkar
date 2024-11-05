import pool from "../dbConfig.js";



export const getregno = async (req, res) => {
    const  token  = req.params.token;
    try {
        let result = await pool.query('SELECT reg_no FROM reset_tokens WHERE token = $1', [token]);
        if (result.rowCount === 0) {
            console.log("No token found");
            return res.status(404).json({ message: "Invalid token" });
        }
        result = result.rows[0];
        // console.log("here")
        // console.log(result)
        res.status(200).json({ reg_no: result.reg_no });
    } catch (error) {
        console.log("Error in data controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const unregisterMeal = async (req, res)=>{
    const { breakfast , lunch , snacks , dinner} = req.body;
    // console.log(req.body)
    const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

console.log(tomorrow);


    try {

        let result = await pool.query(`
            INSERT INTO unregistered_meals (reg_no, date, breakfast, lunch, snacks, dinner)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (reg_no, date) DO UPDATE
            SET breakfast = $3, lunch = $4, snacks = $5, dinner = $6
        `, [req.user.reg_no, tomorrow, breakfast, lunch, snacks, dinner]);
        
        if(result.rowCount===0){
            console.log("cant unregister in db")
            return res.status(404).json({error:"cant insert into db"});
        }
        // console.log(result.rows)

        return res.status(201).json({message:"success"});

    } catch (error) {
        console.log("error in unregesteermeal controller ", error)
    res.status(500).json({error:"internal server error"});
    }

}

export const userUnregisteredMeals = async(req,res)=>{
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    console.log(tomorrow);
    
    
    try {
        let result  =  await pool.query(`select * from unregistered_meals where reg_no=$1 and date =$2`, [req.user.reg_no, tomorrow])
        console.log(result.rows)
        if(result.rowCount===0){
            console.log("not unregistered in db")
            return res.status(201).json({message:"not unregistered yet"});
        }
        // console.log(result.rows)

        return res.status(201).json(result.rows[0]);

    } catch (error) {
        console.log( "error in userUnregisteredMeals user controller ",error);
        res.status(500).json({error:"internal server error"});
    }

    
}
