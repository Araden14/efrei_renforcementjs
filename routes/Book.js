const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/Bookcontroller');

// GET /books  get all books
router.get('/', getAllBooks);

// GET /books/:id  get book by id
router.get('/:id', getBookById);

// POST /books create a book
router.post('/', createBook);

// PUT /books update a book
router.put('/:id', updateBook);

// DELETE /books delete a book
router.delete('/:id', deleteBook);

module.exports = router; 