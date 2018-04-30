
// Imports
const express = require(`express`);
const bodyParser = require(`body-parser`);

const {BlogPosts} = require(`./model.js`);

// Further package accessibility
const router = express.Router();
const jsonParser = bodyParser.json();

// Create some pre-loaded data.
BlogPosts.create(`Opinion`,`This story is full of intrigue, romance, and terror`, `James B Jordan`, `01/16/2019`);
BlogPosts.create(`First Post`, `Hello, this is only a test.  Do not reply.`, `Mike Boba`, `02/27/1972`);


// Routing
router.get(`/`, (req, res) => {
    res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = [`title`, `content`, `author`];
    for (let i=0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `The field ${field} is missing from the request.`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    const newPost = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    res.status(201).json(newPost);
});

router.delete(`/:id`, (req, res) => {
    console.log(req.params.id);
    BlogPosts.delete(req.params.id);
    console.log(`Deleted the post with id \'${req.params.id}\'`);
    res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = [`title`, `content`, `author`, `id`];
    for (let i=0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `The field ${field} is missing from the request.`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    if (req.params.id !== req.body.id) {
        const message = `The item and routing id's do not match.`
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating post \`${req.params.id}\``);

    const updatedPost = {
        id : req.params.id ,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate || Date.now()
    };
    BlogPosts.update(updatedPost);
    res.status(204).end();
});

module.exports = router;