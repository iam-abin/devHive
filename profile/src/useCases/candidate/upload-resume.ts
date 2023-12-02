export = (dependencies: any)=>{
    const { repositories:{candidateProfileRepository} } = dependencies;

    if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

    const execute = ({id, data}: any)=>{
        return candidateProfileRepository.uploadResume({id, data})
    }

    return { execute }
}