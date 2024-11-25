export type RecordStringAny = Record<string, any>;

export interface UserInterface {
  id?: number;
  username: string;
  email?: string;
  password: string;
  [key: string]: any;
}

export const UserDB: UserInterface[] = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'password123',
  },
  {
    id: 2,
    username: 'jane_smith',
    password: 'securepass456',
  },
  {
    id: 3,
    username: 'michael_brown',
    password: 'mypassword789',
  },
  {
    id: 4,
    username: 'sarah_jones',
    email: 'sarah.jones@example.com',
    password: 'passw0rd!',
  },
  {
    id: 5,
    username: 'david_wilson',
    email: 'david.wilson@example.com',
    password: '1234abcd',
  },
];
