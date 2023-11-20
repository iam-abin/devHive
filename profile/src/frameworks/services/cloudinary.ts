import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: "dwpugg2gl",
	api_key: "563492879358121",
	api_secret: "DmDvGL06so7_R_nW2vthE00lNWw",
});

export const uploadImage = async () => {
	const result = await cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg");
    console.log(result);
    
};
