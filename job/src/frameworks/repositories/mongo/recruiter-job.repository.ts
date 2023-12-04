import schemas from "../../database/mongo/models"

const {JobModel} = schemas

export = {
    createJob: async (jobData: object)=>{
        const newJob = await JobModel.create(jobData);
        console.log(newJob);
        return newJob
    },

    deleteJob: async (id: string)=>{
        const deletedJob = await JobModel.deleteOne({_id: id});
        console.log("deletedJob: ",deletedJob);
        return deletedJob
    },

    updateJob: async (id: string, data: object)=>{
        const updatedJob = await JobModel.findOneAndUpdate({ "_id": id }, { $set: data }, {new: true});
		return updatedJob;
    }
}