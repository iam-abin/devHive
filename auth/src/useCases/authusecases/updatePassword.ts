import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { IUpdatePasswordInput } from "../../frameworks/types/userInterface";

export = (dependencies: IDependenciesData)=>{
    const { repositories:{usersRepository} } = dependencies;

    if (!usersRepository) throw new Error("usersRepository should exist in dependencies");

    const execute = ({id, password}: IUpdatePasswordInput)=>{
        return usersRepository.updatePassword({id, password})
    }

    return { execute }
}