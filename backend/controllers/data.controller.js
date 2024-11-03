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


export const getMenu = async(req,res) =>{
    const hostel = req.params.hostel;
try {
    let menu = await pool.query(`select * from menu where hostel_name = $1` , [hostel]);
    
    if (menu.rowCount===0) {
        console.log("no menu found in db")
       return res.status(404).json({error:"menu not found"});


    }
menu  = menu.rows;
// console.log(menu);
return res.status(201).json(menu);

} catch (error) {
    console.log("error in getMenu constroller ", error)
    res.status(500).json({error:"internal server error"});
}

    


}

export const getDayMenu = async(req, res)=>{
 const hostel = req.query.hostel;
 const day = req.query.day;

 try {
    let menu = await pool.query(`select * from menu where hostel_name = $1 and day = $2` , [hostel , day]);
    
    if (menu.rowCount===0) {
        console.log("no menu found in db")
       return res.status(404).json({error:"menu not found"});


    }
menu  = menu.rows;

return res.status(201).json(menu);
    
 } catch (error) {
    console.log("error in getDayMenu controller ", error)
    res.status(500).json({error:"internal server error"});
 }
}


export const unregisterMeal = async (req, res)=>{
    const {reg_no , breakfast , lunch , snacks , dinner} = req.body;
    const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

console.log(tomorrow);


    try {

        let result = await pool.query(`insert into unregistered_meals values ($1 ,$2, $3,$4,$5,$6)` , [reg_no , tomorrow , breakfast, lunch ,snacks ,dinner])
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