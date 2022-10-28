import axios from "axios";
import jwt_decode from "jwt-decode";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response,addUser) => {
  const decoded = jwt_decode(response.credential);
  // console.log(decoded)
  const { name, picture,email, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
    email:email,
  };
  addUser(user);
  await axios.post(`${BASE_URL}/api/auth`, user);
};
