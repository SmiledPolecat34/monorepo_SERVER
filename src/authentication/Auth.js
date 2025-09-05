import User from "../models/User.js";
import bcrypt from "bcryptjs";

User.createUser = function (id, name, email, password) {
  return new User(id, name, email, password);
};

export default User;
