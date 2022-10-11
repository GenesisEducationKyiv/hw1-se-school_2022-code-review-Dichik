import { RabbitMQ } from "../rabbitmq";

export class ConsumerBroker extends RabbitMQ {
    
    public async consume(channel: any, queue: string): Promise<any> {
        return new Promise((resolve) => {
            const messages: Array<object> = [];
            channel.consume(queue, (msg: any) => {
                    let message: any;
                    try {
                    message = JSON.parse(msg.content.toString());
                    } catch (err) {
                    message = msg.content.toString();
                    }
                    messages.push(message);
                    resolve(messages);
                }, { 
                    noAck: true 
                }
            );
        });
    }

}