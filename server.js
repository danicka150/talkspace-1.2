import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '.' });
});

io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    socket.on('register', (data) => {
        console.log('📝 Register:', data.username);
        socket.emit('register_success', { user: { username: data.username } });
    });

    socket.on('login', (data) => {
        console.log('🔑 Login:', data.username);
        socket.emit('login_success', { user: { username: data.username } });
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 Server running on port ' + PORT);
});