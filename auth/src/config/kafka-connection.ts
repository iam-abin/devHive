import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'auth-client',
    brokers: ['kafka-srv:9092']
})

export { kafka }