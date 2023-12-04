import schemas from "../../database/mongo/models";

const { JobModel } = schemas;

export = {
	applyJob: async(id: string, data: object) => {
        
    },

	filterJob: async(jobFilterData: object) => {
        const filteredJobs = await JobModel.find({},jobFilterData) 
    },

	getAllJobs: async () => {
		const jobs = await JobModel.aggregate([{ $sort: { updatedAt: 1 } }]);
        console.log(jobs);
        return jobs
        
	},

	getAJob: async (id: string) => {
        const job = await JobModel.findById(id);
        return job
    },
};
