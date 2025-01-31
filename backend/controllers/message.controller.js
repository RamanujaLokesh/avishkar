import pool from "../dbConfig.js";



export const getMessages = async (req, res) => {
    try {
        const hostel = req.params.hostel;
        console.log(hostel)
        if (req.user.hostel !== 'All' && hostel !== req.user.hostel) {
            return res.status(403).json({ error: "not authorized to get messages of this hostel !" })
        }

        let messages = await pool.query(`select * from messages where hostel_name = $1 order by timestamp asc limit 20`, [hostel]);
        if (messages.rowCount === 0) {
            return res.status(204).json([]);
        }
        messages = messages.rows;
        res.status(201).json(messages);



    } catch (error) {
        console.log("error in getMessages controller", error.message)
        return res.status(500)

    }

}






export const sendMessage = async (req, res) => {
    try {
        const hostel = req.params;

        if (hostel !== req.user.hostel) return res.status(403).json({ error: "not authorized to send message in this hostel !" })

        const message = req.body;

        let senMes = await pool.query(`insert into messages (hostel_name , text , sender_regno ) values($1,$2,$3) returning unique_id`, [hostel, message, req.user.reg_no]);

        if (senMes.rowCount === 0) {
            return res.status(500).json({ error: "couldnot send message try again later" });
        }


    } catch (error) {
        console.log("error in sendMessage controller", error.message)
        return res.status(500)
    }
}

export const deleteMsg = async(req,res)=>{
const { id } = req.params;
  
  try {
    const result = await pool.query('DELETE FROM messages WHERE unique_id = $1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    return res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete message'});
  }
}