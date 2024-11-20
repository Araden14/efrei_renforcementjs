// EJS template for books

const express = require('express');
const router = express.Router();
const Book = require('../../models/Book');


router.get('/', async (req, res) => {
    try {
        const books = await Book.find(); // Fetch the books from the database
        res.render('Books', { Book: books }); // Pass the books to the template
    } catch (err) {
        console.error('Error rendering the view:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
module.exports = router;