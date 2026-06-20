export default async function handler(req, res) {
  const url = `https://api.themoviedb.org/3${req.url}`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
        Accept: 'application/json',
      },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch from TMDB' });
  }
}
