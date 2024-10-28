import { KafkaPublisher, TOPICS, JOB_DELETED_EVENT } from '@abijobportal/common';

export class JobDeletedEventPublisher extends KafkaPublisher<JOB_DELETED_EVENT> {
    topic: TOPICS.JOB_DELETED_TOPIC = TOPICS.JOB_DELETED_TOPIC;
}

// if delete is soft delete, use job-update-publisher.ts
// use this only if i am using JOB_DELETED_EVENT
