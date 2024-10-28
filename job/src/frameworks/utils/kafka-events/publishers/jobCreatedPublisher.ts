import { KafkaPublisher, TOPICS, JOB_CREATED_EVENT } from '@abijobportal/common';

export class JobCreatedEventPublisher extends KafkaPublisher<JOB_CREATED_EVENT> {
    topic: TOPICS.JOB_CREATED_TOPIC = TOPICS.JOB_CREATED_TOPIC;
}
