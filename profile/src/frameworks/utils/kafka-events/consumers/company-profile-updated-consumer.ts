import { Kafka,  KafkaMessage } from "kafkajs";
import { KafkaConsumer, TOPICS, COMPANY_PROFILE_UPDATED_EVENT } from "@abijobportal/common";
import { handleMessage } from "../handleMessage";

export class CompanyProfileUpdatedEventConsumer extends KafkaConsumer<COMPANY_PROFILE_UPDATED_EVENT>{
    topic: TOPICS.COMPANY_PROFILE_UPDATED_TOPIC = TOPICS.COMPANY_PROFILE_UPDATED_TOPIC;

    groupId: string = "profile-1";

    constructor(client: Kafka){
        super(client);
    }

    async onMessage(data: COMPANY_PROFILE_UPDATED_EVENT['data'], topic: string, message: KafkaMessage): Promise<void> {
        
			// dont need to check userType as every users are stored in one collection 
			handleMessage(data, topic, message )
        
    }
    
}