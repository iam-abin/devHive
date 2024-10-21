import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";
import { RecruiterProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/recruiter-profile-updated-publisher";
import { kafkaClient } from "../../config/kafka.connection";
import { UserUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-updated-publisher";
import { IRecruiterProfile } from "../../frameworks/types/recruiter";

export = (dependencies: IDependency) => {
	const {
		useCases: {
			updateRecruiterProfileUseCase,
		},
	} = dependencies;

	return async (req: Request, res: Response) => {
		const updatedData = req.body as Partial<IRecruiterProfile>;
		const { userId } = req.currentUser!;
		
		const recruiter = await updateRecruiterProfileUseCase(
			dependencies
		).execute(userId, updatedData);
		
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
			userId: userId,
            
		});

		await new UserUpdatedEventPublisher(kafkaClient).publish({
			name: updatedData?.name,
			email: updatedData?.email,
			phone: updatedData?.phone,
			role: "recruiter",
			userId: userId!,
			isActive: updatedData?.isActive!,
		});

		res.status(200).json({ message: "recruiter data", data: recruiter });
	};
};
