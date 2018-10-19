import { Azure, ServiceBusService, createServiceBusService } from 'azure-sb';

export interface Dictionary<T> {
  [k: string]: T;
}

export interface TopicMessageOptions {
  brokerProperties?: Azure.ServiceBus.BrokerProperties;
  customProperties?: Dictionary<any>;
}

export interface ReceivedMessage<T> {
  parsedBody: T;
  message: Azure.ServiceBus.Message;
}

export class ServiceBus {
  private _bus: ServiceBusService;

  constructor(connectionString: string) {
    this._bus = createServiceBusService(connectionString);
  }
  /**
   * Create a service bus topic if doesn't exist.
   * @param {string} name
   * Topic name
   * @param {Azure.ServiceBus.CreateTopicIfNotExistsOptions} options
   * Topic Options
   * @returns {Promise<Azure.ServiceBus.Response>}
   */
  public createTopic(
    name: string,
    options: Azure.ServiceBus.CreateTopicIfNotExistsOptions
  ): Promise<Azure.ServiceBus.Response>;
  /**
   * Create a service bus topic if doesn't exist.
   * @param {string} name
   * Topic name
   * @returns {Promise<Azure.ServiceBus.Response>}
   */
  public createTopic(name: string): Promise<Azure.ServiceBus.Response>;

  createTopic(
    name: string,
    options?: Azure.ServiceBus.CreateTopicIfNotExistsOptions
  ): Promise<Azure.ServiceBus.Response> {
    return new Promise<Azure.ServiceBus.Response>((resolve, reject) => {
      if (!options) {
        this._bus.createTopicIfNotExists(name, (error, result, response) => {
          if (error) reject(error);
          if (result) resolve(response);
        });
      } else {
        this._bus.createTopicIfNotExists(
          name,
          options,
          (error, result, response) => {
            if (error) reject(error);
            if (result) resolve(response);
          }
        );
      }
    });
  }
  /**
   * Get a topic
   * @param {string} name
   */
  getTopic(name: string) {
    return new Promise<Azure.ServiceBus.Results.Models.Topic>(
      (resolve, reject) => {
        this._bus.getTopic(name, (error, response) => {
          if (error) reject(error);
          resolve(response);
        });
      }
    );
  }
  /**
   * Delete topic
   * @param {string} name
   */
  deleteTopic(name: string) {
    return new Promise<Azure.ServiceBus.Response>((resolve, reject) => {
      this._bus.deleteTopic(name, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }
  /**
   * List topics in namespace
   * @param {Azure.ServiceBus.ListTopicsOptions} options
   */
  listTopics(options?: Azure.ServiceBus.ListTopicsOptions) {
    return new Promise((resolve, reject) => {
      if (options) {
        this._bus.listTopics(options, (error, results) => {
          if (error) reject(error);
          resolve(results);
        });
      } else {
        this._bus.listTopics((error, results) => {
          if (error) reject(error);
          resolve(results);
        });
      }
    });
  }
  /**
   * Create a topic subscription.
   * @param {string} name
   * Topic name
   * @param {string} subscriptionName
   * Subscription name
   * @param {Azure.ServiceBus.CreateSubscriptionOptions} options
   * Subscription Options
   * @returns {Promise<Azure.ServiceBus.Results.Models.Subscription>}
   */
  public createTopicSubscription(
    name: string,
    subscriptionName: string,
    options: Azure.ServiceBus.CreateSubscriptionOptions
  ): Promise<Azure.ServiceBus.Results.Models.Subscription>;
  /**
   * Create a topic subscription.
   * @param {string} name
   * Topic name
   * @param {string} subscriptionName
   * Subscription name
   * Topic Options
   * @returns {Promise<Azure.ServiceBus.Results.Models.Subscription>}
   */
  public createTopicSubscription(
    name: string,
    subscriptionName: string
  ): Promise<Azure.ServiceBus.Results.Models.Subscription>;

  createTopicSubscription(
    name: string,
    subscriptionName: string,
    options?: Azure.ServiceBus.CreateSubscriptionOptions
  ) {
    return new Promise((resolve, reject) => {
      if (!options) {
        this._bus.createSubscription(
          name,
          subscriptionName,
          (error, result) => {
            if (error) reject(error);
            if (result) resolve(result);
          }
        );
      } else {
        this._bus.createSubscription(
          name,
          subscriptionName,
          options,
          (error, result) => {
            if (error) reject(error);
            if (result) resolve(result);
          }
        );
      }
    });
  }
  /**
   * Get a subscriptions
   * @param {string} name
   * Topic name
   * @param {string}subscripitonName
   */
  getSubscription(name: string, subscripitonName: string) {
    return new Promise<Azure.ServiceBus.Results.Models.Subscription>(
      (resolve, reject) => {
        this._bus.getSubscription(name, subscripitonName, (error, response) => {
          if (error) reject(error);
          resolve(response);
        });
      }
    );
  }
  /**
   * List subscriptions in topic
   * @param {string} name
   * @param {Azure.ServiceBus.Results.Models.Subscription} options
   */
  listSubscriptions(
    name: string,
    options?: Azure.ServiceBus.ListSubscriptionsOptions
  ) {
    return new Promise((resolve, reject) => {
      if (options) {
        this._bus.listSubscriptions(name, options, (error, results) => {
          if (error) reject(error);
          resolve(results);
        });
      } else {
        this._bus.listSubscriptions(name, (error, results) => {
          if (error) reject(error);
          resolve(results);
        });
      }
    });
  }
  /**
   * Delete topic subscription
   * @param {string} name
   * @param {string} subscriptionName
   */
  deleteSubscription(name: string, subscriptionName: string) {
    return new Promise<Azure.ServiceBus.Response>((resolve, reject) => {
      this._bus.deleteSubscription(
        name,
        subscriptionName,
        (error, response) => {
          if (error) reject(error);
          resolve(response);
        }
      );
    });
  }
  /**
   * Delete message
   * @param {Azure.ServiceBus.MessageOrName} message
   */
  deleteMessage(message: Azure.ServiceBus.MessageOrName) {
    return new Promise<Azure.ServiceBus.Response>((resolve, reject) => {
      this._bus.deleteMessage(message, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }
  /**
   * Unlock a message
   * @param {Azure.ServiceBus.MessageOrName} message
   */
  unlockMessage(message: Azure.ServiceBus.MessageOrName) {
    return new Promise<Azure.ServiceBus.Response>((resolve, reject) => {
      this._bus.unlockMessage(message, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }
  /**
   * Renew a message lock
   * @param {Azure.ServiceBus.MessageOrName} message
   */
  renewMessageLock(message: Azure.ServiceBus.MessageOrName) {
    return new Promise<Azure.ServiceBus.Response>((resolve, reject) => {
      this._bus.renewLockForMessage(message, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }
  /**
   * Send message to topic
   * @param {string} name
   * @param {Dictionary<any>} data
   * @param {TopicMessageOptions} options
   * @returns {Promise<Azure.ServiceBus.Response>}
   */
  sendTopicMessage(
    name: string,
    data: Dictionary<any>,
    options?: TopicMessageOptions
  ): Promise<Azure.ServiceBus.Response> {
    return new Promise<Azure.ServiceBus.Response>((resolve, reject) => {
      const body = JSON.stringify(data);
      const contentType = 'json';
      const message = options
        ? Object.assign(options, { body, contentType })
        : { body, contentType };
      this._bus.sendTopicMessage(name, message, (error, result) => {
        if (error) reject(error);
        if (result) resolve(result);
      });
    });
  }
  /**
   * Receive a message from a topic subsctiption
   * @param name
   * Topic name
   * @param {string} subscriptionName
   * Subscription name to receive messages from
   * @param {boolean} isPeekLock
   * Lock message after receiving.
   * Default behaviour is to delete the message see https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-nodejs-how-to-use-topics-subscriptions#receive-messages-from-a-subscription
   */
  receiveSubscriptionMessage<T>(
    name: string,
    subscriptionName: string,
    isPeekLock: boolean = false
  ): Promise<ReceivedMessage<T>> {
    return new Promise<ReceivedMessage<T>>((resolve, reject) => {
      this._bus.receiveSubscriptionMessage(
        name,
        subscriptionName,
        { isPeekLock },
        (error, message) => {
          if (error) {
            reject(error);
          } else {
            const response = {
              parsedBody: <T>JSON.parse(message.body),
              message,
            };
            resolve(response);
          }
        }
      );
    });
  }
}
