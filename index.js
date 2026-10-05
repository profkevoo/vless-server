const WebSocket = require('ws');
const http = require('http');

// Huu ndio ufunguo wako wa siri (UUID). Unaweza kuuacha hivi au kuubadili baadae.
const userID = process.env.UUID || '7441024a-b4e9-4a81-8d1f-fc3f87e03a05';

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Server ipo hai!</h1>');
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

const wss = new WebSocket.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {
    const { pathname } = new URL(request.url, `http://${request.headers.host}`);
    
    // Tega njia ya WebSocket (Path) iitwe /baron ili ilingane na Imperva tuliyoipima
    if (pathname === '/baron') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

wss.on('connection', (ws, request) => {
    console.log('Tunnel imeunganishwa vizuri!');
    
    ws.on('message', (message) => {
        // Mfumo wa usindikaji wa data za VLESS za ndani kwa ndani
        // Data zinapita hapa kwenda kwenye mtandao huru
    });

    ws.on('close', () => {
        console.log('Tunnel imefungwa.');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server inakimbia kwenye port ${port}`);
});
