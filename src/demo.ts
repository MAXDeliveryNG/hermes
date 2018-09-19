import { HermesClient, HermesMessage, OnMessageReceived } from './index';
import { OnError, delay } from '@azure/event-hubs';

interface Trip {
    id: string;
    trip_distance: number;
    status: string;
}

const connectionString = process.env.CONNECTION_STRING || 'Endpoint=sb://chatter.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=FBDNnnRB+7ZUu+z7sajHy07h1m5pNSkgLOqqFM6jECc=';
const hubName = process.env.EVENTHUB_NAME || 'test';

const hermes = new HermesClient(connectionString, hubName);

async function main() {
    const ids = await hermes.getPartitionsIds();
    const hub = await hermes.getHubRuntime();
    console.log('Hub', hub);

    for (let i = 0; i < 1; i++) {
        const onMessage: OnMessageReceived = <Trip>(event: HermesMessage<Trip>) => {
            console.log(event.body);
        }

        const onError: OnError = (err) => {
            console.error(err);
        }

        hermes.receiveMessage(ids[i], onMessage, onError);

        await delay(3000);
        console.log("***********Created receiver %d", i);
        const trip: HermesMessage<Trip> = {
            body: {
                id: `trip-${i}`,
                trip_distance: Math.random(),
                status: 'end_trip'
            }
        }
        await hermes.sendMessage(trip, ids[i]);
        console.log("***********Created sender %d and sent the message...", i);
        // Giving enough time for the receiver to receive the message...
        await delay(6000);
        //await rcvrHandler.stop();
    }
}

main()
    .then(() => hermes.close())
    .catch(console.log);