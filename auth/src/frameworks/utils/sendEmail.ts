import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { otpNodemailerInterface } from "../types/otp-nodemailer-interface"; 

export const generateEmailVerificationOtp = (): otpNodemailerInterface => {
	console.log("in generate email otp fn");
	const otpLength = 6;
	const otp = otpGenerator.generate(otpLength, {
		digits: true,
		lowerCaseAlphabets:false,
		upperCaseAlphabets:false,
		specialChars: false,
	});
	const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
	console.log("Generated OTP:", otp);
	return { otp, expiryTime };
};

export const sendVerificationEmail = async (
	email: string,
	otp: string,
	subject: string,
	text: string
) => {
	console.log("transporter");

	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: "abinvarghese273@gmail.com",
			pass: "frjn aczl fyet pxaj",
		},
		connectionTimeout: 10000,
	});

	console.log("mail options");
	console.log("in sendMail service: email:", email, " otp: ", otp);

	const mailOptions = {
		from: "devHive abinvarghese273@gmail.com",
		to: email,
		subject: subject,
		text: text,
		html: `
		<h3>devHive</h3><br/>
		<p>Enter the following otp : ${otp}</p>
	  `,
	};

	// try {
	console.log("before send mail ");

	const info = await transporter.sendMail(mailOptions);
	console.log("Email send successfully info is- ", info);

	// } catch (error:any) {
	//     console.log("Email not send",error);
	//     throw new Error(error.message)

	// }

	return info;
};
