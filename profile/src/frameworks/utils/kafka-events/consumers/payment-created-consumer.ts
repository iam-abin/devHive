import { Kafka,  KafkaMessage } from "kafkajs";
import { KafkaConsumer, TOPICS, PREMIUM_PAYMENT_DONE_EVENT } from "@abijobportal/common";
import { handleMessage } from "../handleMessage";

export class paymentCreatedEventConsumer extends KafkaConsumer<PREMIUM_PAYMENT_DONE_EVENT>{
    topic: TOPICS.PREMIUM_PAYMENT_TOPIC = TOPICS.PREMIUM_PAYMENT_TOPIC;

    groupId: string = "profile-4";

    constructor(client: Kafka){
        super(client);
    }

    async onMessage(data: PREMIUM_PAYMENT_DONE_EVENT['data'], topic: string, message: KafkaMessage): Promise<void> {

        console.log("payment crated consumer job ",data);
			
		handleMessage(data, topic, message )
        
    }
    
}