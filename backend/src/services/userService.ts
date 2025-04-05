import User, { IUser } from "../models/User";

export const updateUserRole = async (
  userId: string,
  newRole: "customer" | "manager" | "pickpoint" | "driver"
): Promise<IUser | null> => {
  // Update the user's role in the database and return the updated document.
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true } // Return the updated document.
  );
  return updatedUser;
};
