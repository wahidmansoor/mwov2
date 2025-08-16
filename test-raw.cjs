const net = require('net');

const socket = new net.Socket();

socket.connect(5001, '127.0.0.1', () => {
  console.log('Connected to server');
  socket.write('OPTIONS /api/health HTTP/1.1\r\nHost: localhost:5001\r\nOrigin: http://localhost:5173\r\nAccess-Control-Request-Method: GET\r\nConnection: close\r\n\r\n');
});

socket.on('data', (data) => {
  console.log('Received:', data.toString());
});

socket.on('close', () => {
  console.log('Connection closed');
});

socket.on('error', (err) => {
  console.error('Socket error:', err);
});
