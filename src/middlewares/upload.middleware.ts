import multer from "multer";
import { AppError } from "../errors/AppError.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new AppError("Format autorisé : jpg, jpeg, png, webp", 400));
    }

    cb(null, true);
  },
});

export default upload;
