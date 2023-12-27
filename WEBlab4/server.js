const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

let chatHistory = [];

io.on('connection', (socket) => {
    console.log('User connected');

    socket.emit('chat history', chatHistory);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (data) => {
        const message = {
            nickname: data.nickname,
            text: data.text,
            time: new Date().toLocaleString(),
        };
        chatHistory.push(message);
        updateChatHistoryFile();

        io.emit('chat message', message);
    });

    socket.on('new user', (nickname) => {
        const welcomeMessage = `Say 'hello' to ${nickname}!`;
        io.emit('chat message', { nickname: "System", text: welcomeMessage, time: new Date().toLocaleString() });
    });
});

function readChatHistoryFromFile() {
    try {
        const data = fs.readFileSync('chatHistory.json', 'utf8');
        chatHistory = JSON.parse(data);
    } catch (err) {
        console.error('Error reading chat history file:', err);
    }
}

function updateChatHistoryFile() {
    try {
        fs.writeFileSync('chatHistory.json', JSON.stringify(chatHistory));
    } catch (err) {
        console.error('Error updating chat history file:', err);
    }
}

readChatHistoryFromFile();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
