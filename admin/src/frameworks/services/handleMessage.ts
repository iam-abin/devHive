interface handleMessageInterface {
	data: any;
	topic: string;
}

export const handleMessage = ({ data, topic }: handleMessageInterface) => {
	switch (topic) {
		case "USER_CREATED_TOPIC":
			break;
		case "USER_CREATED_TOPIC":
			break;
		default:
			break;
	}
};
