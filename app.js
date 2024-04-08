// Update the base URL for the JSON server
const BASE_URL = 'http://localhost:3000';
const API_KEY = 'AIzaSyBrl0C4kxsDXomgBBpbEduv2ZvUZBH6CmQE'; 

document.addEventListener('DOMContentLoaded', () => {
    displayBooks(); // Display all books by default
    addGenreEventListeners(); // Add event listeners to genre buttons
});

// Function to create a book element
function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const img = document.createElement('img');
    img.src = book.imageUrl;
    img.alt = book.title;
    bookElement.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = book.title;
    bookElement.appendChild(title);

    const description = document.createElement('p');
    description.textContent = book.description;
    bookElement.appendChild(description);

    // Add like, comment, favorite, and bookmark functionality
    const likeButton = createButton('Like', () => likeBook(book.id));
    const commentButton = createButton('Comment', () => {
        const comment = prompt('Enter your comment:');
        if (comment) {
            addComment(book.id, comment);
        }
    });
    const favoriteButton = createButton(book.favorite ? 'Remove Favorite' : 'Add Favorite', () => {
        toggleFavorite(book.id);
    });
    const bookmarkButton = createButton('Bookmark', () => {
        const pageNumber = prompt('Enter the page number to bookmark:');
        if (pageNumber && !isNaN(pageNumber)) {
            bookmarkPage(book.id, parseInt(pageNumber));
        }
    });

    bookElement.append(likeButton, commentButton, favoriteButton, bookmarkButton);

    return bookElement;
}

// Function to create a button element with specified text and click handler
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

// Function to fetch book data from external API and save to database
async function addNewBook() {
    try {
        const bookData = await fetchBookDataFromAPI(); // Fetch book data from external API
        if (!bookData) {
            throw new Error('Failed to fetch book data from API');
        }

        const savedBook = await saveBookToDatabase(bookData); // Save book data to local database
        if (!savedBook) {
            throw new Error('Failed to save book data to database');
        }

        displayBooks(); // Refresh displayed books
    } catch (error) {
        console.error('Error adding new book:', error);
    }
}

// Function to fetch book data from an external API
async function fetchBookDataFromAPI() {
    try {
        const response = await fetch(`API_ENDPOINT_HERE?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book data from API');
        }
        const bookData = await response.json();
        return bookData;
    } catch (error) {
        console.error('Error fetching book data from API:', error);
        return null;
    }
}

// Function to save book data to the local database
async function saveBookToDatabase(bookData) {
    try {
        const response = await fetch(`${BASE_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        });
        if (!response.ok) {
            throw new Error('Failed to save book data to database');
        }
        const savedBook = await response.json();
        return savedBook;
    } catch (error) {
        console.error('Error saving book data to database:', error);
        return null;
    }
}

// Function to display books based on category
async function displayBooks(category = '') {
    try {
        const url = category ? `${BASE_URL}/volumes?q=subject:${category}&key=${API_KEY}` : `${BASE_URL}/volumes?key=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        const books = data.items || [];
        const bookContainer = document.getElementById('bookContainer');
        if (!bookContainer) {
            throw new Error('bookContainer element not found');
        }
        bookContainer.innerHTML = ''; // Clear previous books
        books.forEach(book => {
            const bookElement = createBookElement(book);
            bookContainer.appendChild(bookElement);
        });
    } catch (error) {
        console.error('Error displaying books:', error);
    }
}

// Function to add event listeners to genre buttons
function addGenreEventListeners() {
    const genreButtons = document.querySelectorAll('.genre-button');
    genreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const genre = button.dataset.genre;
            displayBooks(genre); // Display books based on selected genre
        });
    });
}

// Function to toggle favorite status of a book
async function toggleFavorite(bookId) {
    try {
        // Implement your favorite toggle logic here
        console.log(`Toggle favorite for book with ID ${bookId}`);
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

// Function to add a new comment to a book
async function addComment(bookId, comment) {
    try {
        // Implement your comment adding logic here
        console.log(`Add comment "${comment}" to book with ID ${bookId}`);
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

// Function to like a book
async function likeBook(bookId) {
    try {
        // Implement your like functionality here
        console.log(`Like book with ID ${bookId}`);
    } catch (error) {
        console.error('Error liking book:', error);
    }
}

// Function to bookmark a page in a book
async function bookmarkPage(bookId, pageNumber) {
    try {
        // Implement your bookmarking functionality here
        console.log(`Bookmark page ${pageNumber} of book with ID ${bookId}`);
    } catch (error) {
        console.error('Error bookmarking page:', error);
    }
}
