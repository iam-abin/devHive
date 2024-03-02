import { KafkaPublisher, TOPICS, PAYMENT_CREATED_EVENT } from "@abijobportal/common";

export class PremiumPaymentDonePublisher extends KafkaPublisher<PAYMENT_CREATED_EVENT>{
    topic: TOPICS.PAYMENT_CREATED_TOPIC = TOPICS.PAYMENT_CREATED_TOPIC;
}