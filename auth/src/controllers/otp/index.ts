import sendOtpTwilioController from "./send-otp-twilio.controller";
import verifyOtpTwilioController from "./verify-otp-twilio.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
        sendOtpTwilioController: sendOtpTwilioController(dependencies),
		verifyOtpTwilioController: verifyOtpTwilioController(dependencies),
	};
};