import schemas from "../../database/mongo/models";

const { PremiumModel } = schemas;

export = {

	createPremium: async (data: any)=>{
		console.log("premium inside create premium ",data);
		const premium =  PremiumModel.buildPremium(data);

		console.log("premium inside create premium ",premium);
		return await premium.save();
	},

	getPremiums: async (id: string) => {
		const chatMessages = await PremiumModel.findById(id);
		return chatMessages;
	},

	updatePremium: async (id: string, status: object) => {
		const updatedJob = await PremiumModel.findOneAndUpdate(
			{ _id: id },
			{ $set: status },
			{ new: true }
		);
		return updatedJob;
	},

};
