import streamifier from "streamifier";

import { cloudinary } from "../../config/cloudinary";
import { IFileData, IUploadResponse } from "../types/candidateProfile";


export const uploadProfilePic = async(file: IFileData): Promise<IUploadResponse>=>{
    return await new Promise((resolve, reject) => {
        const cloudinary_upload_stream = cloudinary.uploader.upload_stream(
            { folder: "devHive_Profile_Pics" },
            (error, result: any) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else { 
                    resolve({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });
                }
            }
        );

        streamifier.createReadStream(file.buffer).pipe(cloudinary_upload_stream);
    }); 
}
