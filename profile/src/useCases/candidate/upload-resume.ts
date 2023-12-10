export = (dependencies: any)=>{
    const { repositories:{candidateProfileRepository} } = dependencies;

    if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

    const execute = ({id, resume_url}: {id: string, resume_url: string})=>{
        return candidateProfileRepository.uploadResume(id, resume_url)
    }

    return { execute }
}