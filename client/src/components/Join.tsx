import { Box, Button, Flex, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Join = () => {
  const [{ name, room }, setInput] = useState({
    name: '',
    room: '',
  });

  const onChangeHandler = (event: any) => {
    setInput((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Box width={'40%'} mx="auto" my={20} height={'600px'}>
      <Heading>Join</Heading>
      <Box>
        <form>
          <VStack spacing={4} mt={4}>
            <Input
              placeholder="Name"
              onChange={onChangeHandler}
              value={name}
              name="name"
            />
            <Input
              placeholder="Room"
              onChange={onChangeHandler}
              value={room}
              name="room"
            />
            <Link to={`/chat?name=${name}&room=${room}`}>
              <Flex justify="center" mx="auto">
                <Button isDisabled={!name || !room}>Sign In</Button>
              </Flex>
            </Link>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
