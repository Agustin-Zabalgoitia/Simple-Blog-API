import { UserCreationAttributes } from "../models/userModel";

const usersDummyData: Array<UserCreationAttributes> = [
  {
    username: "John",
    password: "$2a$12$0qfr2sAPx3j3I1b.5opX..7zFVZPdSEqF3q5Pjo21wEzV44pX20pm",
    email: "john@doe.com",
  },
  {
    username: "Mary",
    password: "adminadmin",
  },
  {
    username: "Gary",
    password: "$2a$12$9LmYbbbRFfh9rblYYoPp/OYk42g2jJ7b5sNvuoZIF7ZXERNzTDhDe",
    email: "gary@stu.net",
  },
];

export default usersDummyData;
