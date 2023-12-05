import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'job-client',
    brokers: ['kafka-srv:9092']
})

export { kafka }