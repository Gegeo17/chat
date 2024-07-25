const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const chatbot = require('./chatbot');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('message', async (message) => {
        try {
            const response = await chatbot.getResponse(message);
            socket.emit('message', response);
        } catch (error) {
            console.error('Erro ao obter resposta:', error);
            socket.emit('message', 'Desculpe, algo deu errado.');
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta ${PORT}`);
});
