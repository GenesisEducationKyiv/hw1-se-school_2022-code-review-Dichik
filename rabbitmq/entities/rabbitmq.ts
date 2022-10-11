import amqp, {Channel, Connection} from 'amqplib/callback_api';

export class RabbitMQ {
    private host: string;
    
    constructor(host: string) {
        this.host = host;
    }

    public async connect(): Promise<Connection> {
        return new Promise((resolve, reject) => {
            amqp.connect(this.host, (error: Error, connection: Connection) => {
                if (error) {
                  reject(error);
                }
                resolve(connection);
              });
        });
    }

    public async createChannel(connection: Connection): Promise<Channel> {
        return new Promise((resolve, reject) => {
            connection.createChannel((error: any, channel: Channel) => {
                if (error) {
                    reject(error);
                }
                resolve(channel);
            });
        });
    }

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