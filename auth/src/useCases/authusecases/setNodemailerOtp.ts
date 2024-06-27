import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

// used in forgot password
export = (dependencies: IDependenciesData)=>{
    const { repositories:{usersRepository} } = dependencies;

    if (!usersRepository) {
		throw new Error("usersRepository should exist in dependencies");
	}

    const execute = ({email, otp}: any)=>{
        return usersRepository.setOtp(email, otp)
    }

    return { execute }
}