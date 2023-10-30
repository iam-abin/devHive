import candidateSignupController from "./signup.controller";

export = (dependencies: any) => {
	return {
        candidateSignupController: candidateSignupController(dependencies),
    }
};
