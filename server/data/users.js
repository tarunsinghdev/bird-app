import bcrypt from 'bcrypt';

export const users = [
  {
    firstName: 'Yogesh',
    lastName: 'Yadav',
    userName: 'yogeshdecodes',
    email: '2803yogesh.yadav@gmail.com',
    password: bcrypt.hashSync('12345@', 10),
    following: [],
    followers: [],
  },
  {
    firstName: 'Tarun',
    lastName: 'Singh',
    userName: 'thesavvycoder',
    email: 'tarunsingh.dev@yahoo.com',
    password: bcrypt.hashSync('12345@', 10),
    following: [],
    followers: [],
  },
  {
    firstName: 'Sachin',
    lastName: 'Tendulkar',
    userName: 'masterblaster',
    email: 'mb@gmail.com',
    password: bcrypt.hashSync('12345@', 10),
    following: [],
    followers: [],
  },
  {
    firstName: 'David',
    lastName: 'Beckham',
    userName: 'davidbeckham',
    email: 'db@gmail.com',
    password: bcrypt.hashSync('12345@', 10),
    following: [],
    followers: [],
  },
];
