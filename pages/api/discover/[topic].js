

import { topicPostsQuery } from './../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req ,res) {
  if (req.method === 'GET') {
    const { topic } = req.query;

    const videosQuery = topicPostsQuery(topic);

    const videos = await client.fetch(videosQuery);

    res.status(200).json(videos);
  }
}
