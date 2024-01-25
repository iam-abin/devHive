import { cloudinary } from "../../config/cloudinary";

export = (dependencies: any)=>{
    const { repositories:{candidateProfileRepository} } = dependencies;

    if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

    const cloudinaryUpload = (file: any) => {
        const result = cloudinary.uploader.upload_stream(
            { folder: 'devHiveImages' },
            (error: any, result: any) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    
                } else {
                    console.log('Cloudinary upload result:', result);
                }
            }
        ).end(file.buffer);

        return result;
    };


    const execute = async (file: any)=>{
        const response: any = cloudinaryUpload(file)
        let resumeUploaded = await candidateProfileRepository.uploadResume(response?.secure_url)
        // if(resumeUploaded){
            return response?.secure_url
        // } else{
            // return resumeUploaded
        // }
       
    }

    return { execute }
}