import schemas from "../../database/mongo/models";

const { JobModel } = schemas;

export = {
    createJob: async (jobData: any)=>{
        console.log("job repository jobData", jobData);
        
        const newJob = JobModel.buildJob(jobData);
        console.log(newJob);
        return await newJob.save()
    },

    deleteJob: async (jobId: string)=>{
        const deletedJob = await JobModel.deleteOne({_id: jobId});
        console.log("deletedJob: ",deletedJob);
        return deletedJob
    },

    updateJob: async (jobId: string, data: object)=>{
        console.log("in updateJob repository jobId", jobId, " data ", data);
        
        const updatedJob = await JobModel.findOneAndUpdate({ "_id": jobId }, { $set: data }, {new: true});
        // const updatedJob = await JobModel.findOneAndUpdate({ "_id": jobId }, { $set: data }, {new: true});
        console.log("in updateJob repository after update", updatedJob);
		return updatedJob;
    },


	filterJob: async(jobFilterData: object) => {
        const filteredJobs = await JobModel.find({},jobFilterData) 
        return filteredJobs
    },

	getAllJobs: async (skip: number, limit: number):Promise<any[]> => {
		// const jobs = await JobModel.aggregate([{ $sort: { createdAt: 1 } }]);
        const jobs = await JobModel.find().sort({createdAt: -1}).skip(skip).limit(limit);
        console.log(jobs);
        return jobs
	},

    getAllJobsByRecruiterId: async (id: string): Promise<any[]> => {
		const jobs = await JobModel.find({recruiterId: id}).sort({createdAt: -1})
        console.log(jobs);
        return jobs
	},

    getCountOfJobs: async (id: string): Promise<number> => {
		const totalJobs: number = await JobModel.countDocuments()
        console.log(totalJobs);
        return totalJobs
	},

	getAJob: async (id: string) => {
        console.log(id,"in job repository");
        
        const job = await JobModel.findById(id);
        return job
    }
    
};
