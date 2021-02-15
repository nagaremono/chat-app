let users: User[] = [];

export interface User {
  id: string;
  name: string;
  room: string;
}

interface Result {
  error?: string;
  user?: User;
}

export const addUser = ({ id, name, room }: User): Result => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const doesUserExist = users.find(
    (user) => user.room === room && user.name === name
  );

  if (doesUserExist) {
    return { error: 'username is taken' };
  }

  const user = { id, name, room };
  users = users.concat(user);

  return { user };
};

export const removeUser = (id: string) => {
  users = users.filter((user) => user.id !== id);
};

export const getUser = (id: string) => {
  return users.find((user) => user.id === id);
};

export const getUsersInRoom = (room: string) => {
  return users.filter((user) => user.room === room);
};
