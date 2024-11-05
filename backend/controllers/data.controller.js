import pool from "../dbConfig.js";




export const getMenu = async(req,res) =>{
    // const hostel = req.params.hostel;
try {
    let menu = await pool.query(`select * from menu where hostel_name = $1` , ['SVBH'||req.user.hostel]);
    
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

export const getNotices = async (req, res) => {
    try {
      const notices = await pool.query("SELECT * FROM noticeboard WHERE hostel_name = $1 ORDER BY timestamp DESC LIMIT 5" , [req.user.hostel]);
      res.status(200).json(notices.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch notices" });
    }
  };


