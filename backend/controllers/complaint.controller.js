import pool from '../dbConfig.js'; 

export const addComplaint = async (req, res) => {
    try {
        const { complaint } = req.body;    

        const result = await pool.query(
            'INSERT INTO stored_complaints (reg_no, hostel_name, complaint) VALUES ($1, $2, $3) RETURNING complaint_id, complaint, time',
            [req.user.reg_no,req.user.hostel, complaint]
        );

        res.status(201).json({ message: 'Complaint added successfully', complaint: result.rows[0] });
    } catch (err) {
        console.error('Error adding complaint:', err);
        res.status(500).json({ error: 'Error adding complaint', message: err.message });
    }
};

export const getComplaints = async (req, res) => {
    try { 

        const result = await pool.query(`
            SELECT * FROM stored_complaints
            WHERE reg_no = $1 AND hostel_name = $2
            ORDER BY time DESC;
        `,[req.user.reg_no,req.user.hostel]);

        res.status(200).json(result.rows);  
    } catch (err) {
        console.error('Error fetching complaints:', err);
        res.status(500).json({ error: 'Error fetching complaints', message: err.message });
    }
};

export const getAllComplaints = async(req,res) => {
    try{
        const result = await pool.query(`
            SELECT * FROM stored_complaints
            WHERE hostel_name = $1
            ORDER BY time DESC;
            `,[req.params.hostel] );
            // if(result.rowCount===0){
            //     return res.status(400).json({message:"no complaints found!"})
            // }
            res.status(200).json(result.rows);  
    } catch (err) {
        console.error('Error fetching complaints:', err);
        res.status(500).json({ error: 'Error fetching complaints', message: err.message });
    }
 };



