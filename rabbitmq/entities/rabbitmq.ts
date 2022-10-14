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

}