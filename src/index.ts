import { EventHub } from './eventhub';
import { ServiceBus } from './servicebus';
import { ClientOptions } from '@azure/event-hubs';

export namespace Hermes {
    export function createEventHub(connectionString: string, hubName: string, options?: ClientOptions): EventHub {
        return new EventHub(connectionString, hubName, options);
    }

    export function createServiceBus(connectionString: string,): ServiceBus {
        return new ServiceBus(connectionString);
    }
}