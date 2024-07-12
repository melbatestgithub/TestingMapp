const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

let serviceProviders = [];

app.post('/register', (req, res) => {
    const { id, type, location } = req.body;
    serviceProviders.push({ id, type, location });
    res.status(200).send('Service is provider registered');
});

app.get('/providers', (req, res) => {
    const { lat, lng, type } = req.query;
    const nearbyProviders = serviceProviders.filter(provider => {
        const distance = Math.sqrt(
            Math.pow(provider.location.lat - lat, 2) + Math.pow(provider.location.lng - lng, 2)
        );
        return distance < 0.1 && provider.type === type; // Adjust the distance threshold as needed
    });
    res.json(nearbyProviders);
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
