import { ConsumerBroker } from "./brokers/consumerBroker";

export class Consumer {

    private broker: ConsumerBroker;
    private queue: string;

    constructor(broker: ConsumerBroker, queue: string) {
        this.broker = broker;
        this.queue = queue; 
    }

    public async consumer(): Promise<Array<string>> {
        const connection = await this.broker.connect();
        const channel = await this.broker.createChannel(connection);

        const messages: Array<string> = await this.broker.consume(channel, this.queue);
        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
        return messages;
    }

}