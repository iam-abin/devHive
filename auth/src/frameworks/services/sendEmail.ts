import nodemailer from "nodemailer";
import crypto from "crypto";

export const generateEmailVerificationToken = ()=>{
	console.log("in generate email token fn");
	
    return crypto.randomBytes(16).toString("hex");
}

export const sendVerificationEmail = async (email: string,userId: string, token:string, subject: string, text: string) => {
	console.log("transporter");
	
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure:false,
		auth: {
			user: "abinvarghese273@gmail.com",
			pass: "frjn aczl fyet pxaj",
		},
		connectionTimeout: 10000,
	});

	console.log("mail options");
	console.log("in sendMail service: userId:",userId," token: ",token);
	
	
	const verificationLink = `https://devhive.dev/candidate/${userId}/verifyEmail/${token }`
	const mailOptions = {
		from:"devHive abinvarghese273@gmail.com",
		to: email,
		subject: subject,
		text: text,
		html:  `
		<h3>devHive</h3><br/>
		<p>Click the following link to verify your email:</p>
		<a href="${verificationLink}">${verificationLink}</a>
	  `
	};

	try {
		console.log("in try before send mail ");
		
        const info = await transporter.sendMail(mailOptions);
        console.log("Email send successfully info is- ",info);
        
        
    } catch (error:any) {
        console.log("Email not send",error);
        throw new Error(error.message)
        
    }

	console.log("email send successfully");
};
