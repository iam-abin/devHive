import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
    const {
        repositories: { jobApplicationRepository },
    } = dependencies;

    if (!jobApplicationRepository) {
        throw new Error(
            "jobApplicationRepository should exist in dependencies"
        );
    }

    const execute = async (candidateId: string, jobId: string) => {
        const isApplicationExist =
            await jobApplicationRepository.getAnAppliedJobByCandidate(
                candidateId,
                jobId
            );

        if (!isApplicationExist) {
            return false;
        }
        return true;
    };

    return { execute };
};
