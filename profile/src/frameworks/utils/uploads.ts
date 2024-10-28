import streamifier from 'streamifier';

import { cloudinary } from '../../config/cloudinary';
import { IFileData, IUploadResponse } from '../types/candidate';
import { UploadApiErrorResponse } from 'cloudinary';

type CloudinaryUploadResult = {
    public_id: string;
    secure_url: string;
};

export const uploadProfilePic = async (file: IFileData): Promise<IUploadResponse> => {
    return await new Promise((resolve, reject) => {
        const cloudinary_upload_stream = cloudinary.uploader.upload_stream(
            { folder: 'devHive_Profile_Pics' },
            (error: UploadApiErrorResponse | undefined, result: CloudinaryUploadResult | undefined) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else if (result) {
                    resolve({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });
                } else {
                    reject(new Error('Upload failed with no result.'));
                }
            },
        );

        streamifier.createReadStream(file.buffer).pipe(cloudinary_upload_stream);
    });
};
