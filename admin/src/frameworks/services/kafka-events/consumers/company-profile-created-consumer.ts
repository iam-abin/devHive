import { Kafka,  KafkaMessage } from "kafkajs";
import { KafkaConsumer, TOPICS, COMPANY_PROFILE_CREATED_EVENT } from "@abijobportal/common";
import { handleMessage } from "../handleMessage";

export class CompanyProfileCreatedEventConsumer extends KafkaConsumer<COMPANY_PROFILE_CREATED_EVENT>{
    topic: TOPICS.COMPANY_PROFILE_CREATED_TOPIC = TOPICS.COMPANY_PROFILE_CREATED_TOPIC;

    groupId: string = "admin-1";

    constructor(client: Kafka){
        super(client);
    }

    async onMessage(data: COMPANY_PROFILE_CREATED_EVENT['data'], topic: string, message: KafkaMessage): Promise<void> {

        console.log("CompanyProfileCreatedTopic consumer admin",data);
			
			// dont need to check userType as every users are stored in one collection 
			handleMessage(data, topic, message )
        
    }
    
}