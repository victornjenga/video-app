import { uuid } from "uuidv4";

import { client } from "../../utils/client";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { userId, postId, follower } = req.body;

    const data = follower
      ? await client
          .patch(postId)
          .setIfMissing({ followers: [] })
          .insert("after", " followers[-1]", [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit()
      : await client
          .patch(postId)
          .unset([` followers[_ref=="${userId}"]`])
          .commit();

    res.status(200).json(data);
  }
}
