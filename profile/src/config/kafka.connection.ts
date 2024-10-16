import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
    clientId: 'profile-client',
    brokers: ['devhive-kafka:9092'],
})

export { kafkaClient }