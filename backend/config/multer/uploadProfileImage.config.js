import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "devstack/profile-images",
    format: async (_, file) => {
      const formats = ["jpg", "jpeg", "png", "gif", "webp"];
      const mimeType = file.mimetype.split("/")[1];
      return formats.includes(mimeType) ? mimeType : "jpg";
    },
    public_id: (_, file) => {
      const nameWithoutExt = file.originalname
        .split(".")
        .slice(0, -1)
        .join(".");

      return `${Date.now()}_${nameWithoutExt}`;
    },
  },
});

const uploadAvatarConfig = multer({ storage: storage });

export { uploadAvatarConfig };
