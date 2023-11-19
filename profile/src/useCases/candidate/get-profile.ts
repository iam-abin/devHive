import { EmailVerificationToken } from "../../entities";
import { emailVerificationTokenInterface } from "../../frameworks/types/emailVerificationTokenInterface";

export = (dependencies: any) => {
	const {
		repositories: { emailVerificationTokenRepository },
	} = dependencies;

	if (!emailVerificationTokenRepository) {
		throw new Error(
			"emailVerificationTokenRepository should exist in dependencies"
		);
	}

	const execute = ({
		userId,
		token,
		email,
	}: emailVerificationTokenInterface) => {
		const tockenDetails = new EmailVerificationToken({
			userId,
			token,
			email,
		});
		const createdToken = emailVerificationTokenRepository.createToken(tockenDetails);
		
		return createdToken;
	};

	return { execute };
};
