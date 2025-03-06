import express from 'express';
import cors from 'cors';
import { getblackholes } from './database.js'; // Adjust path if needed

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/blackholes/search', async (req, res) => {
  try {
    const query = req.query.q; // Get the search query from the request
    if (!query) {
      const blackholes = await getblackholes();
      res.json(blackholes);
      return;
    }
    const blackholes = await getblackholes(query);
    res.json(blackholes);
  } catch (err) {
    console.error('Error searching blackholes:', err);
    res.status(500).send('Server error');
  }
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});