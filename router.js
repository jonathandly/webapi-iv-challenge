const express = require('express');

const DB = require('./data/db.js');

const router = express.Router();

router.get('/', async(req, res) => {
    
    try {
        const posts = await DB.find(req.query);
        res.status(200).json(posts);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
});

router.get('/:id', async(req, res) => {

    try {
        const post = await DB.findById(req.params.id);

        if(!post.length) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json(post);
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
});

router.post('/', async(req, res) => {
    const post = { title, contents } = req.body;

    try {
        if(!title || !contents) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        } else {   
            const saved = await DB.insert(post);
            res.status(201).json(saved);
        }
    } catch(err) {
        res.status(500).json({ error: "There was an error while saving the post to the database." });
    }
});

router.delete('/:id', async(req, res) => {

    try {
        const deleted = await DB.remove(req.params.id);

        if(!deleted) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json({ message: "The post has been successfully removed." });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "The post could not be removed." });
    }
});

router.put('/:id', async(req, res) => {
    const { title, contents } = req.body;
    try {
        const updated = await DB.update(req.params.id, req.body);
        if(!updated) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else if(!title || !contents) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        } else {
            res.status(200).json({ title, contents });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "The post information could not be modified." });
    }
});

module.exports = router;
