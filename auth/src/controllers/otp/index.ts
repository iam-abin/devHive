import sendOtpTwilioController from "./send-otp-twilio.controller";
import verifyOtpTwilioController from "./verify-otp-twilio.controller";

import sendOtpNodemailerController from "./send-otp-nodemailer.controller";
import verifyOtpNodemailerController from "./verify-otp-nodemailer.controller";

import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	return {
        sendOtpTwilioController: sendOtpTwilioController(dependencies),
		verifyOtpTwilioController: verifyOtpTwilioController(dependencies),
		sendOtpNodemailerController: sendOtpNodemailerController(dependencies),
		verifyOtpNodemailerController: verifyOtpNodemailerController(dependencies),
	};
};