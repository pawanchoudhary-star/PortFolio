const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRouter = require('./routes/contact');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio Server is running 🚀' });
});

app.use('/api/contact', contactRouter);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
