const WebSocket = require('ws');
const http = require('http');

// Ufunguo wako wa siri wa VMess (UUID)
const userID = process.env.UUID || '7441024a-b4e9-4a81-8d1f-fc3f87e03a05';

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>VMess Server ipo hai!</h1>');
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

const wss = new WebSocket.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {
    const { pathname } = new URL(request.url, `http://${request.headers.host}`);
    
    // Path yetu ile ile ya Imperva
    if (pathname === '/baron') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

wss.on('connection', (ws, request) => {
    console.log('VMess Tunnel Connected!');
    
    ws.on('message', (message) => {
        // Hapa inachakata data za VMess na kuzirusha mtandaoni
    });

    ws.on('close', () => {
        console.log('Tunnel Closed.');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server inakimbia kwenye port ${port}`);
});
