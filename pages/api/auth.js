import { client } from "../../utils/client";

export default async function handler(req, res) {
  if (req.method==="POST") {
    const user=req.body;
    client.createIfNotExists(user).then(() => {
      res.status(200).json("Login successful");
    });
  }
}



