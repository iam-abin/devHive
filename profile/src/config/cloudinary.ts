import { v2 as cloudinary } from "cloudinary";
import { appConfig } from "./appConfig";

cloudinary.config({
    cloud_name: appConfig.CLOUDINARY_CLOUD_NAME,
    api_key: appConfig.CLOUDINARY_API_KEY,
    api_secret: appConfig.CLOUDINARY_API_SECRET,
});

export { cloudinary };
