# Hermes
[![CircleCI](https://circleci.com/gh/MAXDeliveryNG/hermes/tree/master.svg?style=svg)](https://circleci.com/gh/MAXDeliveryNG/hermes/tree/master)

Hail Hermes!!, messenger of the MAX micro-service pantheon.

## Installation

Install from NPM

```
yarn add @maxng/hermes --save
```

## Overview

Hermes exposes an API with which microservice can communicate with each other and emit events for 
other system to ingest.

Hermes has two core APIs
* EventHub
* ServiceBus

### EventHub

The EventHub API is powered by [Azure EventHubs](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about)
The EventHub API provides an interface to stream or ingest events generated within a shared Azure EventHub.

### ServiceBus

The ServiceBus API is powered by [Azure ServiceBus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview)
The ServiceBus API provides an interface for broking messages between services or systems.

The ServiceBus provides severally messaging mechanisms;
* Queues
* Topics

#### Queues

Messages are sent to and received from queues. Queues enable you to store messages until the receiving application is available to receive and process them.

![queues](https://docs.microsoft.com/en-us/azure/service-bus-messaging/media/service-bus-messaging-overview/about-service-bus-queue.png "Queues")

### Topics

You can also use topics to send and receive messages. While a queue is often used for point-to-point communication, topics are useful in publish/subscribe scenarios.

![topics](https://docs.microsoft.com/en-us/azure/service-bus-messaging/media/service-bus-messaging-overview/about-service-bus-topic.png "Topics")

Topics can have multiple, independent subscriptions. A subscriber to a topic can receive a copy of each message sent to that topic. Subscriptions are named entities, which are durably created but can optionally expire or auto-delete.