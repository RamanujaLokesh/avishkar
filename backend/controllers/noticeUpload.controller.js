import pool from "../dbConfig.js";

export const uploadNotice = async (req, res) => {
  console.log("Uploaded File:", req.file);
  const { title, hostel_name } = req.body;
  const pdfDocument = req.file ? req.file.filename : null;

  if (!title || !hostel_name || !pdfDocument) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    
    const query = `
      INSERT INTO noticeboard (title, pdf_document, hostel_name)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [title, pdfDocument, hostel_name];
    const result = await pool.query(query, values);

    res.status(201).json({ notice: result.rows[0] });
    

  } catch (error) {
    console.error("Error uploading notice:", error.message);
    res.status(500).json({ error: "Failed to upload notice." });
  }
};
