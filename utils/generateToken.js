import jwt from "jsonwebtoken";
export const generateToken = (user) => {
  const { email, _id } = user;

  const token = jwt.sign({ email, _id }, process.env.SECRET_JWT_KEY);
  return token;
};
