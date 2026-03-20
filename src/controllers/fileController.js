import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("No file uploaded");
      error.status = 400;
      return next(error);
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const downloadUrl = `${baseUrl}/api/v1/files/download/${req.file.filename}`;

    res.status(201).json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      downloadUrl,
    });
  } catch (err) {
    next(err);
  }
};

const downloadFile = async (req, res, next) => {
  try {
    const filename = req.params.filename;
    const uploadsDir = path.join(__dirname, "../../uploads");
    const filePath = path.join(uploadsDir, filename);

    // Prevent path traversal attacks
    if (!filePath.startsWith(uploadsDir + path.sep)) {
      const error = new Error("Invalid filename");
      error.status = 400;
      return next(error);
    }

    try {
      await fs.access(filePath);
    } catch {
      const error = new Error("File not found");
      error.status = 404;
      return next(error);
    }

    res.download(filePath, filename);
  } catch (err) {
    next(err);
  }
};

const listFiles = async (req, res, next) => {
  try {
    const uploadsDir = path.join(__dirname, "../../uploads");

    if (!existsSync(uploadsDir)) {
      return res.status(200).json({ files: [] });
    }

    const entries = await fs.readdir(uploadsDir);
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const files = entries
      .filter((filename) => filename !== ".gitkeep")
      .map((filename) => ({
        filename,
        downloadUrl: `${baseUrl}/api/v1/files/download/${filename}`,
      }));

    res.status(200).json({ files });
  } catch (err) {
    next(err);
  }
};

export default { uploadFile, downloadFile, listFiles };
