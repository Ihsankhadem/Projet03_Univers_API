import cloudinary from "../config/cloudinary.js";

const CloudinaryService = {
  uploadImage: async (file: string) => {
    const result = await cloudinary.uploader.upload(file);

    return result.secure_url;
  },
};

export default CloudinaryService;
