import { UserCreationAttributes } from "../models/userModel";

const usersDummyData: Array<UserCreationAttributes> = [
  {
    username: "John",
    roleId: 2,
    password: "Password123",
    email: "john@doe.com",
  },
  {
    username: "Mary",
    roleId: 2,
    password: "adminadmin",
  },
  {
    username: "Gary",
    roleId: 1,
    password: "L337",
    email: "gary@stu.net",
  },
];

export default usersDummyData;
