import { Hermes } from '../src/index';
import { EventHub } from '../src/eventhub';
import { ServiceBus } from '../src/servicebus';

const connectionString =
  process.env.CONNECTION_STRING ||
  'Endpoint=sb://chatter.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=FBDNnnRB+7ZUu+z7sajHy07h1m5pNSkgLOqqFM6jECc=';

const hubName = process.env.EVENTHUB_NAME || 'test';
const serviceBusConnectionString =
  process.env.SERVICE_BUS_STRING ||
  'Endpoint=sb://ramble.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=pwSES7By/4LPJzBrM/2tX6ZlKCVK1LjGJ4Pefiq7f5U=';

describe('Hermes', () => {
  it('should be defined', () => {
    expect(Hermes).toBeDefined();
  });

  it('can create an EventHub instance', () => {
    const eventhub = Hermes.createEventHub(connectionString, hubName);
    expect(eventhub).toBeDefined();
    expect(eventhub).toBeInstanceOf(EventHub);
  });

  it('can create an ServiceBus instance', () => {
    const servicebus = Hermes.createServiceBus(serviceBusConnectionString);
    expect(servicebus).toBeDefined();
    expect(servicebus).toBeInstanceOf(ServiceBus);
  });
});
