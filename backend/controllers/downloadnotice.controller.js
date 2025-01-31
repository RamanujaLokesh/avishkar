// downloadnotice.controller.js
import path from "path";
import fs from "fs";

export const downloadNotice = (req, res) => {
  const { filename } = req.params;
  const filePath = path.resolve("uploads", filename);

  try {
    fs.accessSync(filePath); // Check if file exists

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on("error", (err) => {
      console.error("File stream error:", err);
      res.status(500).json({ error: "Error downloading the file" });
    });
  } catch (error) {
    res.status(404).json({ error: "File not found" });
  }
};
