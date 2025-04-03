// server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ES module __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like index.html)
app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

/*app.get('/', (req, res) => {
  res.send('Home route reached');
}); */

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// node src/server.js
//http://localhost:5000