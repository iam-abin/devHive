import { Kafka,  KafkaMessage } from "kafkajs";
import { KafkaConsumer, TOPICS, MEMBERSHIP_PLAN_CREATED_EVENT } from "@abijobportal/common";
import { handleMessage } from "../handleMessage";

export class MembershipPlanCreatedEventConsumer extends KafkaConsumer<MEMBERSHIP_PLAN_CREATED_EVENT>{
    topic: TOPICS.MEMBERSHIP_PLAN_CREATED_TOPIC = TOPICS.MEMBERSHIP_PLAN_CREATED_TOPIC;
    

    groupId: string = "payment-1";

    constructor(client: Kafka){
        super(client);
    }

    async onMessage(data: MEMBERSHIP_PLAN_CREATED_EVENT['data'], topic: string, message: KafkaMessage): Promise<void> {
        
			// dont need to check role as every users are stored in one collection 
			handleMessage(data, topic, message )
        
    }
    
}