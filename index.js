require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const BlogPost = require('./models/blog.js');

// Connect to database
mongoose.connect(`mongodb://localhost/mongooseAssociation`);

const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB on ${db.host}:${db.port}`);
});

db.on('error', (err) => {
    console.log(`Error`, err);
});

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('home route, backend');
});

app.get('/blog', (req, res) => {
    // One way to create a post
    BlogPost.create({ 
        title: 'Mongoose for all Mongoose', 
        body: 'This is a cool blog post.'
    });
    
    // Another way to create blog post and save to database
    const post1 = new BlogPost({
        title: 'SEI 1019',
        body: 'Software Engineers are cool.'
    });
    post1.save();
    res.send('Post completed');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});