import express from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { router } from './router';
import cors from 'cors';
import { addUser, getUser } from './users/users';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(router);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  socket.on('disconnect', () => {
    console.log('socket disconnected');
  });

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit('message', {
      user: 'admin',
      text: `${user?.name} welcome to ${user?.room} room.`,
    });

    socket.broadcast
      .to(user!.room)
      .emit('message', { user: 'admin', text: `${user?.name} has joined.` });

    socket.join(user!.room);
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user!.room).emit('message', { user: user?.name, text: message });

    callback();
  });
});

httpServer.listen(4000, () => {
  console.log('server started on *:4000');
});
