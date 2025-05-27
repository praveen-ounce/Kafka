const kafka = require('kafka-node');
const WebSocket = require('ws');
const express = require('express');
const app = express();

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new kafka.Consumer(
  client,
  [{ topic: 'maintenance-topic', partition: 0 }],
  { autoCommit: true,
    fromOffset: 'earliest' 
  }
);

const wss = new WebSocket.Server({ port: 3000 });

consumer.on('message', (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
