export = (dependencies: any) => {
	const { repositories:{emailVerificationTokenRepository} } = dependencies;

	if (!emailVerificationTokenRepository) {
		throw new Error("emailVerificationTokenRepository should exist in dependencies");
	}

	const execute = (email: string) => {
		return emailVerificationTokenRepository.getOtpByEmail(email);
	};

	return { execute };
};
