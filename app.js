const SerialPort = require('serialport');

const parsers = SerialPort.parsers;

// Use a `\r\n` as a line terminator
const parser = new parsers.Readline({
  delimiter: '\r\n'
});

var port = new SerialPort('COM3', {
  baudRate: 9600
});

port.pipe(parser);

port.on('open', () => console.log('Port open'));






var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server,
wss = new WebSocketServer({port: 40510})

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    //ws.send(`${new Date()}`);
      console.log(message);
  })
})

function sendData(data) {
    console.log("Data: ", data);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
}

parser.on('data', sendData);