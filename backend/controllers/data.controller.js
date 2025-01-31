import pool from "../dbConfig.js";




export const getMenu = async (req, res) => {
  // const hostel = req.params.hostel;
  const { hostel } = req.query
  try {
    let menu = await pool.query(`select * from menu where hostel_name = $1`, [hostel]);

    if (menu.rowCount === 0) {
      console.log("no menu found in db")
      return res.status(404).json({ error: "menu not found" });


    }
    menu = menu.rows;
    // console.log(menu);
    return res.status(201).json(menu);

  } catch (error) {
    console.log("error in getMenu constroller ", error)
    res.status(500).json({ error: "internal server error" });
  }




}

export const getDayMenu = async (req, res) => {
  const hostel = req.query.hostel;
  const day = req.query.day;

  try {
    let menu = await pool.query(`select * from menu where hostel_name = $1 and day = $2`, [hostel, day]);

    if (menu.rowCount === 0) {
      console.log("no menu found in db")
      return res.status(404).json({ error: "menu not found" });


    }
    menu = menu.rows;

    return res.status(201).json(menu);

  } catch (error) {
    console.log("error in getDayMenu controller ", error)
    res.status(500).json({ error: "internal server error" });
  }
}

export const getNotices = async (req, res) => {
  let { hostel } = req.query;
  try {
    const notices = await pool.query("SELECT * FROM noticeboard WHERE hostel_name = $1 ORDER BY timestamp DESC LIMIT 5", [hostel]);
    if(notices.rowCount===0){
      console.log("here")
      return res.status(301).json({messsage:"no notice found"})
    }
    res.status(200).json(notices.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch notices" });
  }
};


export const getUnRegStudents = async (req, res) => {
  // Get the current date and time
  const now = new Date();

  // Add 4 hours to the current time
  now.setHours(now.getHours() + 5);

  // Format the date as needed for the query, e.g., 'YYYY-MM-DD' for SQL
  const formattedDate = now.toISOString().split('T')[0];

  console.log(formattedDate);

  try {
    let result = await pool.query(
      `SELECT * FROM unregistered_meals 
         WHERE reg_no IN (SELECT reg_no FROM hostel_details WHERE hostel_name = $2)
         AND date = $1 AND (breakfast = false OR lunch = false OR snacks = false OR dinner = false)`,
      [formattedDate, req.params.hostel]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "No data found" });
    }

    return res.status(201).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch notices" });
  }
};



export const changeMenu = async (req, res) => {
  const { day, hostel, breakfast, lunch, snacks, dinner } = req.body;
  try {
    // Capitalize the first letter of the day to match database values
    const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);

    const result = await pool.query(
      `
      UPDATE menu
      SET breakfast = $3, lunch = $4, snacks = $5, dinner = $6
      WHERE hostel_name = $1 AND day = $2
      `,
      [hostel, formattedDay, breakfast, lunch, snacks, dinner]
    );

    if (result.rowCount === 0) {
      console.error('Error in modifying data in changeMenu controller');
      return res.status(404).json({ error: "No record found to update" });
    }

    return res.status(200).json({ message: "Menu updated successfully" });
  } catch (error) {
    console.error("Error updating menu:", error);
    return res.status(500).json({ message: "Internal server error: Failed to update menu" });
  }
};

