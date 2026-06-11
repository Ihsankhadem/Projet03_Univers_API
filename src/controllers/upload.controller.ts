// src/controllers/upload.controller.ts

import { Request, Response } from "express";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { UploadApiResponse } from "cloudinary";

const UploadController = {
  upload: async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "Aucun fichier envoyé",
        });
      }

      const buffer = req.file.buffer;

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "univers",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            if (!result) {
              return reject(new Error("Aucune réponse reçue de Cloudinary"));
            }

            resolve(result);
          },
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
      });

      return res.status(200).json({
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
      });
    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      return res.status(500).json({
        error: "Erreur upload Cloudinary",
      });
    }
  },
};

export default UploadController;
