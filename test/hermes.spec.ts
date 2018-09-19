import { HermesClient, HermesMessage } from '../src/index';
import { EventHubClient } from '@azure/event-hubs';

const connectionString = process.env.CONNECTION_STRING || 'Endpoint=sb://chatter.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=FBDNnnRB+7ZUu+z7sajHy07h1m5pNSkgLOqqFM6jECc=';
const hubName = process.env.EVENTHUB_NAME || 'test';

interface Trip {
    id: string;
    trip_distance: number;
    status: string;
}

describe('Hermes Client', () => {
    it('Shoud be defined', () => {
        expect(HermesClient).toBeDefined();
    });

    it('Can create an instance', () => {
        const hermes = new HermesClient(connectionString, hubName);
        expect(hermes).toBeDefined();
    });

    it('Can get the hub name', () => {
        const hermes = new HermesClient(connectionString, hubName);
        expect(hermes.getHubName()).toEqual(hubName);
    });

    it('Can get the client', () => {
        const hermes = new HermesClient(connectionString, hubName);
        expect(hermes.getClient()).toBeInstanceOf(EventHubClient);
    });

    it('Can send a message', () => {
        const hermes = new HermesClient(connectionString, hubName);
        const message: HermesMessage<Trip> = {
            body: {
                id: 'sknfksnlg',
                trip_distance: 45302.324,
                status: 'end_trip'
            }
        }

        expect(hermes.sendMessage(message)).resolves.toBeDefined();
    }, 2000);

    it('Can send many messages at once', () => {
        const hermes = new HermesClient(connectionString, hubName);

        const messages: HermesMessage<Trip>[] = [];

        for (let i = 0; i < 500; i++) {
            messages.push({
                body: {
                    id: `gsakngknsg-${i}`,
                    trip_distance: Math.random(),
                    status: 'end_trip'
                }
            });
        }

        expect(hermes.batchSendMessage(messages)).resolves.toBeDefined();
    });
});