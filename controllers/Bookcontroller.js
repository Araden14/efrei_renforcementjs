const Book = require('../models/Book');
const { verifyToken } = require('../middleware/jwt');

// Get all books
const getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.send(books);
};

// Get book by id
const getBookById = async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    res.send(book);
};

// Create a new book
const createBook = async (req, res) => {
    verifyToken()
    const newBook = new Book({
        label: req.body.label,
        description: req.body.description
    });
    await newBook.save();
    res.status(201).send({
        success: true,
        book: newBook
    });
};

// Update a book
const updateBook = async (req, res) => {
    const bookId = req.params.id;
    const bookToUpdate = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        bookToUpdate,
        { new: true }
    );
    res.send({
        success: true,
        message: `Le livre ${bookId} a été mise a jour`,
        book: updatedBook
    });
};

// Delete a book
const deleteBook = async (req, res) => {
    const bookId = req.params.id;
    await Book.findByIdAndDelete(bookId);
    res.send({
        success: true,
        message: `Le livre ${bookId} a bien supprimé`
    });
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}; 