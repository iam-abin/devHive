import { UpdatePasswordInput } from "../../frameworks/types/userInterface";

export = (dependencies: any)=>{
    const { usersRepository } = dependencies;

    if (!usersRepository) {
		throw new Error("usersRepository should exist in dependencies");
	}

    const execute = ({id, newPassword}: UpdatePasswordInput)=>{
        return usersRepository.updatePassword({id, newPassword})
    }

    return { execute }
}