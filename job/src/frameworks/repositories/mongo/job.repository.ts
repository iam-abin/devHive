import schemas from "../../database/mongo/models";

const { JobModel } = schemas;

export = {
    createJob: async (jobData: any)=>{
        console.log("job repository jobData", jobData);
        
        const newJob = JobModel.buildJob(jobData);
        console.log(newJob);
        return await newJob.save()
    },

    deleteJob: async (id: string)=>{
        const deletedJob = await JobModel.deleteOne({_id: id});
        console.log("deletedJob: ",deletedJob);
        return deletedJob
    },

    updateJob: async (id: string, data: object)=>{
        console.log("in updateJob repository id", id, " data ", data);
        
        const updatedJob = await JobModel.findOneAndUpdate({ "_id": id }, { $set: data }, {new: true});
        console.log("in updateJob repository after update", updatedJob);
		return updatedJob;
    },


	filterJob: async(jobFilterData: object) => {
        const filteredJobs = await JobModel.find({},jobFilterData) 
        return filteredJobs
    },

	getAllJobs: async ():Promise<any[]> => {
		// const jobs = await JobModel.aggregate([{ $sort: { createdAt: 1 } }]);
        const jobs = await JobModel.find().sort({createdAt: -1})
        console.log(jobs);
        return jobs
	},

    getAllJobsByRecruiterId: async (id: string): Promise<any[]> => {
		const jobs = await JobModel.find({recruiterId: id}).sort({createdAt: -1})
        console.log(jobs);
        return jobs
	},

	getAJob: async (id: string) => {
        const job = await JobModel.findById(id);
        return job
    }
    
};
