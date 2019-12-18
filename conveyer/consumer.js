const app = require('express')();
const kafka = require('kafka-node');
const bodyParser = require('body-parser');

const port = 5002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    consumer = new Consumer(client,
        [{topic: 'Posts', offset: 0}],
        {autoCommit: false}
    );

    consumer.on('message', function(message) {
        console.log(message);
    });

    consumer.on('error', function(err) {
        console.log(err);
    });

    consumer.on('offsetOutOfRange', function (err) {
        console.log('offsetOutOfRange:', err);
    });


app.listen(port, () => console.log(`Kafka producer running on port ${port}!`));