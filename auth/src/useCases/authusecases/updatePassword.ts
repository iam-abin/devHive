import { IDependency } from "../../frameworks/types/dependencyInterface";
import { IUpdatePassword } from "../../frameworks/types/userInterface";

export = (dependencies: IDependency)=>{
    const { repositories:{usersRepository} } = dependencies;

    if (!usersRepository) throw new Error("usersRepository should exist in dependencies");

    const execute = async ({userId, password}: IUpdatePassword)=>{
        return await usersRepository.updatePassword({userId, password})
    }

    return { execute }
}