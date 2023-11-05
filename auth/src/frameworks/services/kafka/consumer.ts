import { kafka } from "../../../config/kafka-connection";
import { handleMessage } from "../handleMessage";

export const consumeMessage = async () => {
	const consumer = kafka.consumer({
		groupId: "auth-consumer",
	});

	// Connect to the Kafka cluster
	await consumer.connect();
	console.log("consumer connected!!!");

	// Subscribe to multiple topics
	await consumer.subscribe({
		topic: "user-messages",
		fromBeginning: true,
	});

	// Consume messages from all subscribed topics
	await consumer.run({
		eachMessage: async ({ topic, partition, message: data }) => {
			console.log("message received from topic: ", topic);
			handleMessage({ topic, data });
		},
	});

	// console.log(`produced data is ${JSON.stringify(producedData)}`);
};
