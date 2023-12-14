import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
    clientId: 'profile-client',
    brokers: ['kafka-srv:9092'],
})

export { kafkaClient }