// uploadRouter.js
import express from "express";
import { uploadNotice } from "../controllers/noticeUpload.controller.js";
import { downloadNotice } from "../controllers/downloadnotice.controller.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  },
});

const router = express.Router();

router.post("/upload", upload.single("pdf_document"), uploadNotice);
router.get("/download/:filename", downloadNotice);

export default router;
