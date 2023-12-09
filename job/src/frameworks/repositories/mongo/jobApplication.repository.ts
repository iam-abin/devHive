import schemas from "../../database/mongo/models";

const { JobModel , jobApplicationModel } = schemas;

export = {

	applyJob: async(id: string, data: object) => {
        const applicationExists = await jobApplicationModel.findOne({_id: id})
        if(!applicationExists){
            const newApplication = await jobApplicationModel.create(data);
            return newApplication
        }
        return null
    },

	getAllAppliedJobsByCandidateId: async (id: string) => {
        // use populate
        const appliedJobs = await jobApplicationModel.find({},{candidateId:id});
        console.log(appliedJobs);
        return appliedJobs
	},

	getAllJobApplicationsByRecruiterId: async (id: string) => {
        // use populate
        const jobApplications = await jobApplicationModel.find({},{recruiterId:id});
        return jobApplications
    },

    updateJobApplicationStatus: async (id: string, status: object)=>{
        const updatedJob = await JobModel.findOneAndUpdate({ "_id": id }, { $set: status }, {new: true});
		return updatedJob;
    },

    
};
