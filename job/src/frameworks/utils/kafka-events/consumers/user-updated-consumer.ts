import { Kafka,  KafkaMessage } from "kafkajs";
import { KafkaConsumer, TOPICS, USER_UPDATED_EVENT } from "@abijobportal/common";
import { handleMessage } from "../handleMessage";

export class UserUpdatedEventConsumer extends KafkaConsumer<USER_UPDATED_EVENT>{

    topic: TOPICS.USER_UPDATED_TOPIC = TOPICS.USER_UPDATED_TOPIC;

    groupId: string = "job-3";

    constructor(client: Kafka){
        super(client);
    }

    async onMessage(data: USER_UPDATED_EVENT['data'] , topic: string, message: KafkaMessage): Promise<void> {

        console.log("updateUserTopic consumer job",data);
			
			// dont need to check userType as every users are stored in one collection 
			// usersRepository.updateStatus(data);
            handleMessage(data, topic, message);
        
    }
    
}