import { EmailVerificationToken } from "../../entities";
import { emailVerificationTokenInterface } from "../../frameworks/types/emailVerificationTokenInterface";

export =  (dependencies: any) => {
	const {
		repositories: { emailVerificationTokenRepository, usersRepository },
	} = dependencies;

	if (!emailVerificationTokenRepository) {
		throw new Error(
			"emailVerificationTokenRepository should exist in dependencies"
		);
	}


	if (!usersRepository) {
		throw new Error(
			"usersRepository should exist in dependencies"
		);
	}

	const execute = async ({
		userId,
		token,
		email,
	}: emailVerificationTokenInterface) => {
		const tockenDetails = new EmailVerificationToken({
			userId,
			token,
			email,
		});
		const tokenFind = await emailVerificationTokenRepository.getToken(tockenDetails);
		console.log("tokenFind in signupEmailVerificationUseCase", tokenFind);
		

		// delete verified token 
		emailVerificationTokenRepository.deleteToken(tockenDetails);

		// to update user verification status in users collection
		usersRepository.updateVerification(userId);
		
		return tokenFind;
	};

	return { execute };
};
