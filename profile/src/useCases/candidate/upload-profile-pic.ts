export = (dependencies: any)=>{
    const { repositories:{candidateProfileRepository} } = dependencies;

    if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

    const execute = ({id, profile_pic_url}: {id: string, profile_pic_url: string})=>{
        return candidateProfileRepository.uploadProfilePic(id, profile_pic_url)
    }

    return { execute }
}