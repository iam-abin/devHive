import { Kafka,  KafkaMessage } from "kafkajs";
import { KafkaConsumer, TOPICS, JOB_DELETED_EVENT } from "@abijobportal/common";
import { handleMessage } from "../handleMessage";

export class JobDeletedEventConsumer extends KafkaConsumer<JOB_DELETED_EVENT>{
    topic: TOPICS.JOB_DELETED_TOPIC = TOPICS.JOB_DELETED_TOPIC;
    

    groupId: string = "admin-4";

    constructor(client: Kafka){
        super(client);
    }

    async onMessage(data: JOB_DELETED_EVENT['data'], topic: string, message: KafkaMessage): Promise<void> {

        console.log("JobDeletedTopic consumer admin",data);
			
			// dont need to check userType as every users are stored in one collection 
            console.log("before handle message ", topic);
            
			handleMessage(data, topic, message )
        
    }
    
}