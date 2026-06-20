export default async function handler(req, res) {
  console.log('req.url:', req.url);
  const path = req.url.replace('/api/tmdb', '');
  const url = `https://api.themoviedb.org/3${path}`;
  console.log('constructed url:', url);
  console.log('token exists:', !!process.env.TMDB_API_ACCESS_TOKEN);
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
        Accept: 'application/json',
      },
    });
    const data = await response.json();
    console.log('tmdb status:', response.status);
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ error: 'Failed to fetch from TMDB' });
  }
}
