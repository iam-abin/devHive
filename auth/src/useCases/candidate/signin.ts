import { User } from "../../entities";
import { UserDataSignin } from "../../frameworks/types/userInterface";

export = (dependencies: any) => {
	const { usersRepository } = dependencies;

	if (!usersRepository) {
		throw new Error("usersRepository should exist in dependencies");
	}

    const execute = ({  email, password, userType }: UserDataSignin )=>{
        
    }
};
