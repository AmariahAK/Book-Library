const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON body of incoming requests
app.use(express.json());

// Serve static files (e.g., frontend files)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get all books or books by genre
app.get('/books', (req, res) => {
    const { genre } = req.query;
    const books = readBooksFromDatabase(genre);
    res.json(books);
});

// API endpoint to add a new book
app.post('/books', (req, res) => {
    const newBook = req.body;
    const books = readBooksFromDatabase();
    books.push(newBook);
    saveBooksToDatabase(books);
    res.json(newBook);
});

// Helper function to read books from database file
function readBooksFromDatabase(genreFilter = null) {
    try {
        const rawData = fs.readFileSync('db.json');
        const books = JSON.parse(rawData).books || [];

        if (genreFilter) {
            return books.filter(book => book.genre === genreFilter);
        }

        return books;
    } catch (error) {
        console.error('Error reading books from database:', error);
        return [];
    }
}

// Helper function to save books to database file
function saveBooksToDatabase(books) {
    try {
        const data = JSON.stringify({ books }, null, 2);
        fs.writeFileSync('db.json', data);
        console.log('Books saved to database successfully.');
    } catch (error) {
        console.error('Error saving books to database:', error);
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
