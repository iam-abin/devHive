import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { otpNodemailerInterface } from "../types/otp-nodemailer-interface"; 

export const generateEmailVerificationOtp = (): otpNodemailerInterface => {
	
	const otpLength = 6;
	const otp = otpGenerator.generate(otpLength, {
		digits: true,
		lowerCaseAlphabets:false,
		upperCaseAlphabets:false,
		specialChars: false,
	});
	const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
	
	return { otp, expiryTime };
};

export const sendVerificationEmail = async (
	email: string,
	otp: string,
	subject: string,
	text: string
) => {
	
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: "abinvarghese273@gmail.com",
			pass: "dogu rtwq gxiv dton",
		},
		connectionTimeout: 10000,
	});
	
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
	
	const info = await transporter.sendMail(mailOptions);
	
	return info;
};
