const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const messageRoutes = require('./routes/messages');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log('Server running on', PORT));
  })
  .catch(err => console.error(err));

// Optional: Socket.IO real-time (commented out by default)
/*
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });
io.on('connection', socket => {
  console.log('socket connected', socket.id);
  socket.on('newMessage', msg => {
    io.emit('message', msg);
  });
});
http.listen(PORT, () => console.log('Socket server running', PORT));
*/
