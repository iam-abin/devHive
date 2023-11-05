import { kafka } from "../../../config/kafka-connection";
import { handleMessage } from "../handleMessage";

export const consumeMessage = async () => {
	const consumer = kafka.consumer({
		groupId: "admin-consumer",
	});

    // Connect to the Kafka cluster
	await consumer.connect();
	console.log("consumer connected!!!");

    // Subscribe to multiple topics
	await consumer.subscribe({
		topic: "USER_CREATED_TOPIC",
		fromBeginning: true,
	});

    // await consumer.subscribe({
	// 	topic: "user-messages",
	// 	fromBeginning: true,
	// });

    // await consumer.subscribe({
	// 	topic: "user-messages",
	// 	fromBeginning: true,
	// });

    // // Consume messages from all subscribed topics
	await consumer.run({
		eachMessage: async ({ topic, partition, message: data }) => {
			console.log("message received from topic: ", topic);
            console.log("-----------"+JSON.stringify(data)+"---------------");
            // Convert the "value" buffer data to a string
const originalData = Buffer.from(data?.value!).toString('utf8');

// Now, `originalData` should contain the original data in a string format.
console.log(originalData);
            
			handleMessage({ topic, data });
		},
	});

	// console.log(`produced data is ${JSON.stringify(producedData)}`);
};
