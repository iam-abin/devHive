import { Kafka,  KafkaMessage } from "kafkajs";
import { KafkaConsumer, TOPICS, PAYMENT_CREATED_EVENT } from "@abijobportal/common";
import { handleMessage } from "../handleMessage";

export class PaymentcreatedEventConsumer extends KafkaConsumer<PAYMENT_CREATED_EVENT>{

    topic: TOPICS.PAYMENT_CREATED_TOPIC = TOPICS.PAYMENT_CREATED_TOPIC;

    groupId: string = "admin-10";

    constructor(client: Kafka){
        super(client);
    }

    async onMessage(data: PAYMENT_CREATED_EVENT['data'], topic: string, message: KafkaMessage): Promise<void> {
        
			// dont need to check role as every users are stored in one collection 
			handleMessage(data, topic, message )
        
    }
    
}