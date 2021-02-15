import React, { useState, useEffect, KeyboardEvent } from 'react';
import queryString from 'query-string';
import { io, Socket } from 'socket.io-client';
import { RouteChildrenProps } from 'react-router-dom';
import { Box, Button, Heading, Input } from '@chakra-ui/react';

let socket: Socket;

interface Message {
  user: string;
  text: string;
}
export const Chat = ({ location }: RouteChildrenProps) => {
  const [{ name, room }, setInput] = useState({
    name: '',
    room: '',
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io('http://localhost:4000');

    socket.emit('join', { name, room }, () => {});

    setInput({
      name: name as string,
      room: room as string,
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on('message', (message: Message) => {
      setMessages((state) => [...state, message]);
    });
  }, [messages]);

  const sendMessage = (event: KeyboardEvent) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(messages);

  return (
    <Box width={'75%'} mx="auto">
      <Heading>Chat</Heading>
      <Box>
        <form>
          <Input
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                sendMessage(event);
              }
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
          />

          <Button>Send</Button>
        </form>
      </Box>
    </Box>
  );
};
