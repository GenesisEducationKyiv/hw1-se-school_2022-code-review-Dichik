import { RabbitMQ } from "./rabbitmq";

export class ProducerBroker extends RabbitMQ {

    public async send(channel: any, queue: string, message: string) {
        return new Promise(() => {
          channel.assertQueue(queue);
          channel.sendToQueue(queue,
            Buffer.from(JSON.stringify({ type: "message", message }))
          );
          console.log(`Sent message is: ${message}`);
        });
    }

}    