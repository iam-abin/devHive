import { kafka } from "../../../config/kafka-connection";

export const produceMessage = async (data: any, topic: string)=>{

    const producer = kafka.producer();
    await producer.connect()
    console.log("producer connected!!!");

    const producedData = await producer.send({
        topic,
        messages: [{
            value: JSON.stringify(data)
        }]
    })
    
    console.log(`produced data is ${JSON.stringify(producedData)}`);
    
}