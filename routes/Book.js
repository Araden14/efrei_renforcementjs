const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/jwt');
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/Bookcontroller');

// GET /books  get all books
router.get('/', verifyToken, getAllBooks);

// GET /books/:id  get book by id
router.get('/:id', verifyToken, getBookById);

// POST /books create a book
router.post('/', verifyToken, createBook);

// PUT /books update a book
router.put('/:id', verifyToken, updateBook);

// DELETE /books delete a book
router.delete('/:id', verifyToken, deleteBook);

module.exports = router; 