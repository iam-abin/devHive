import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
    clientId: 'chat-client',
    brokers: ['kafka-srv:9092'],
})

export { kafkaClient }