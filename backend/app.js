require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Schema and Model
const experienceSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Experience = mongoose.model('Experience', experienceSchema);

// Routes
app.post('/api/posts', async (req, res) => {
  try {
    const { content } = req.body;
    const newPost = new Experience({ content });
    await newPost.save();
    res.status(201).json({ message: 'Experience posted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while saving the experience.' });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
