import { Kafka,  KafkaMessage } from "kafkajs";
import { KafkaConsumer, TOPICS, RECRUITER_PROFILE_UPDATED_EVENT } from "@abijobportal/common";
import { handleMessage } from "../handleMessage";

export class RecruiterProfileUpdatedEventConsumer extends KafkaConsumer<RECRUITER_PROFILE_UPDATED_EVENT>{
    topic: TOPICS.RECRUITER_PROFILE_UPDATED_TOPIC = TOPICS.RECRUITER_PROFILE_UPDATED_TOPIC;

    groupId: string = "admin-7";

    constructor(client: Kafka){
        super(client);
    }

    async onMessage(data: RECRUITER_PROFILE_UPDATED_EVENT['data'], topic: string, message: KafkaMessage): Promise<void> {

        console.log("RecruiterProfileUpdatedTopic consumer admin",data);
			
			// dont need to check userType as every users are stored in one collection 
			handleMessage(data, topic, message )
        
    }
    
}