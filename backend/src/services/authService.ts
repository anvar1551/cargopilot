import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterUserInput): Promise<IUser> => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create user with default role 'customer'
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "customer",
  });
  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; role: string; user: IUser }> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const payload = { id: user._id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return { token, role: user.role, user };
};
