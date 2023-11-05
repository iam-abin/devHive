interface handleMessageInterface {
	data: any;
	topic: string;
}

export const handleMessage = ({ data, topic }: handleMessageInterface) => {
	switch (topic) {
		case "USER_UPDATED_TOPIC":
			break;
		default:
			break;
	}
};
