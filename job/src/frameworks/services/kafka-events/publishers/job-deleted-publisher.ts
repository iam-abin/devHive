import { KafkaPublisher, TOPICS, JOB_UPDATED_EVENT } from "@abijobportal/common";

export class JobUpdatedEventPublisher extends KafkaPublisher<JOB_UPDATED_EVENT>{
    topic: TOPICS.JOB_UPDATED_TOPIC = TOPICS.JOB_UPDATED_TOPIC;
}

// if delete is soft delete, use job-update-publisher.ts 
// use this only if i am using JOB_DELETED_EVENT