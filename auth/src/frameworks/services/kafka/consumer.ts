import { kafka } from "../../../config/kafka-connection";
import { handleMessage } from "../handleMessage";

export const consumeMessage = async () => {
	const consumer = kafka.consumer({
		groupId: "auth-consumer",
	});

	// Connect to the Kafka cluster
	await consumer.connect();
	console.log("consumer auth connected!!!");

	// Subscribe to multiple topics
	await consumer.subscribe({
		topic: 'USER_UPDATED_TOPIC',
		fromBeginning: true,
	});

	// Consume messages from all subscribed topics
	await consumer.run({
		eachMessage: async ({ topic, partition, message: data }) => {
			console.log("message received from topic: ", topic);

			// Convert the "value" buffer data to a string
			const parsedMessage: string | null | undefined = data?.value?.toString('utf8')

			if(parsedMessage){
				// converting a json string to js object
				const parsedObject = JSON.parse(parsedMessage)
				console.log("-----------"+parsedObject+"---------------");
				console.log("-----------"+parsedObject?.name+"---------------");

				handleMessage({ topic, parsedObject });

			}else{
				console.log("parsed message is null or undefined");
				return
			}
		},
	});

	// console.log(`produced data is ${JSON.stringify(producedData)}`);
};
