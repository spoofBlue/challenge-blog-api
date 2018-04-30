
// Imports
const express = require('express');
const morgan = require('morgan');

const blogPostsRouter = require(`./blogPostsRouter`);

// Further package accessibility
const app = express();

// Middleware
app.use(morgan(`common`));

// Routing
app.use(`/blog-posts`, blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});