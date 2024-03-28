import { Kafka,  KafkaMessage } from "kafkajs";
import { KafkaConsumer, TOPICS, JOB_CREATED_EVENT } from "@abijobportal/common";
import { handleMessage } from "../handleMessage";

export class JobCreatedEventConsumer extends KafkaConsumer<JOB_CREATED_EVENT>{
    topic: TOPICS.JOB_CREATED_TOPIC = TOPICS.JOB_CREATED_TOPIC;
    

    groupId: string = "admin-4";

    constructor(client: Kafka){
        super(client);
    }

    async onMessage(data: JOB_CREATED_EVENT['data'], topic: string, message: KafkaMessage): Promise<void> {
        
			// dont need to check userType as every users are stored in one collection 
			handleMessage(data, topic, message )
        
    }
    
}