const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON body of incoming requests
app.use(express.json());

// Serve static files (e.g., frontend files)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get all books
app.get('/books', (req, res) => {
    const books = readBooksFromDatabase();
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
function readBooksFromDatabase() {
    const rawData = fs.readFileSync('db.json');
    const books = JSON.parse(rawData).books || [];
    return books;
}

// Helper function to save books to database file
function saveBooksToDatabase(books) {
    const data = JSON.stringify({ books }, null, 2);
    fs.writeFileSync('db.json', data);
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
