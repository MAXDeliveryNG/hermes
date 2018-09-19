import { EventHubClient, ClientOptions, EventData, Delivery, OnError, ReceiveOptions, ReceiveHandler, EventHubRuntimeInformation } from '@azure/event-hubs';

export interface HermesMessage<T> extends EventData {
    body: T
}

export type OnMessageReceived  = <T>(eventData: HermesMessage<T>) => void;

export class HermesClient {
    private client: EventHubClient;
    private hubName: string;

    constructor(connectionString: string, hubName: string, options?: ClientOptions) {
        this.client = EventHubClient.createFromConnectionString(
            connectionString,
            hubName,
            options
        );

        this.hubName = hubName;

        return this;
    }

    getHubName() {
        return this.hubName;
    }

    getClient() {
        return this.client;
    }
    /**
     * Get partitions ids
     * @returns {Promise<string[]>}
     */
    async getPartitionsIds(): Promise<string[]> {
        try {
            return this.client.getPartitionIds();
        } catch (e) {
            throw e;
        }
    }
    /**
     * Get Event Hub runtime information
     * @returns {Promise<EventHubRuntimeInformation>}
     */
    async getHubRuntime(): Promise<EventHubRuntimeInformation> {
        try {
            return this.client.getHubRuntimeInformation();
        } catch (e) {
            throw e;
        }
    }
    /**
     * Send message to the Event Hub
     * @param {HermesMessage} message 
     * @param {string} partitionId 
     * @returns {Promise<Delivery>}
     */
    async sendMessage<T>(message: HermesMessage<T>, partitionId?: string): Promise<Delivery> {
        try {
           return await this.client.send(message, partitionId);
        } catch (e) {
            throw e;
        }
    }
    /**
     * Send multiple message to the Event Hub
     * @param {HermesMessage} messages 
     * @param {string} partitionId
     * @returns {Promise<Delivery>}
     */
    async batchSendMessage<T>(messages: HermesMessage<T>[], partitionId?: string): Promise<Delivery> {
        try {
            return await this.client.sendBatch(messages, partitionId);
        } catch (e) {
            throw e;
        }
    }
    /**
     * Recieve messages from an Event Hub
     * @param {string} partiionID 
     * @param {OnMessageReceived} onMessageRecieved 
     * @param {OnError} onError 
     * @param {ReceiveOptions} options 
     * @returns {ReceiveHandler}
     */
    receiveMessage(
        partiionID: string | number,
        onMessageRecieved: OnMessageReceived,
        onError: OnError, options?: ReceiveOptions): ReceiveHandler {
        return this.client.receive(partiionID, onMessageRecieved, onError, options)
    }
    /**
     * Close connection
     */
    async close() {
        try {
            return await this.client.close();
        } catch (e) {
            throw e;
        }
    }
}