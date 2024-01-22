import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
    clientId: 'admin-client',
    brokers: ['devhive-kafka-headless:9092']
})

export { kafkaClient }