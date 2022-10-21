import { searchPostsQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const videosQuery = searchPostsQuery(id);

    const videos = await client.fetch(videosQuery);

    res.status(200).json(videos);
  }
}
