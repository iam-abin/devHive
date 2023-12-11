import { Kafka,  KafkaMessage } from "kafkajs";
import { groupId } from "../group-id";
import { KafkaConsumer, TOPICS, USER_CREATED_EVENT } from "@abijobportal/common";
import { handleMessage } from "../handleMessage";

export class UserCreatedEventConsumer extends KafkaConsumer<USER_CREATED_EVENT>{

    topic: TOPICS.USER_CREATED_TOPIC = TOPICS.USER_CREATED_TOPIC;

    groupId: string = groupId;

    constructor(client: Kafka){
        super(client);
    }

    async onMessage(data: USER_CREATED_EVENT['data'], topic: string, message: KafkaMessage): Promise<void> {

        console.log("createCandidateTopic consumer admin",data);
			
			// dont need to check userType as every users are stored in one collection 
			handleMessage(data, topic, message )
        
    }
    
}