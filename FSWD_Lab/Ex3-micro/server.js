const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/microblog');

const Post = mongoose.model('Post', new mongoose.Schema({
  title: String,
  content: String,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/api/posts', async (req, res) => {
  await new Post(req.body).save();
  res.send('Post created');
});

app.get('/api/posts', async (req, res) => {
  res.json(await Post.find());
});

app.listen(3000, () => console.log('Server running on port 3000'));
