import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";
import { RecruiterProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/recruiter-profile-updated-publisher";
import { kafkaClient } from "../../config/kafka.connection";
import { UserUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-updated-publisher";

export = (dependencies: IDependency) => {
	const {
		useCases: {
			getRecruiterProfileByUserIdUseCase,
			updateRecruiterProfileUseCase,
		},
	} = dependencies;

	return async (req: Request, res: Response) => {
		const updatedData = req.body;
		const { userId } = req.body;

		const existingData = await getRecruiterProfileByUserIdUseCase(
			dependencies
		).execute(userId);
		
		const recruiter = await updateRecruiterProfileUseCase(
			dependencies
		).execute(existingData, updatedData);
		
		const recruiterProfileUpdatedEvent =
			new RecruiterProfileUpdatedEventPublisher(kafkaClient);
		await recruiterProfileUpdatedEvent.publish({
			name: updatedData?.name,
			email: updatedData?.email,
			phone: updatedData?.phone,
			isActive: updatedData?.isActive,
			gender: updatedData?.gender,
			profileImage: updatedData?.profileImage,
			about: updatedData?.about,
			companyName: updatedData.companyName,
			companyLocation: updatedData.companyLocation,
			companyWebsite: updatedData.companyWebsite,
			companyState: updatedData.companyState,
			companyCountry: updatedData.companyCountry,
			// company_id: updatedData?.company_id,
			userId: updatedData?.userId,
            
		});

		await new UserUpdatedEventPublisher(kafkaClient).publish({
			name: updatedData?.name,
			email: updatedData?.email,
			phone: updatedData?.phone,
			isActive: updatedData?.isActive,
			role: "recruiter",
			userId: updatedData?.userId,
		});

		res.status(200).json({ message: "recruiter data", data: recruiter });
	};
};
