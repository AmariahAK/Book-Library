// Update the base URL for the JSON server
const BASE_URL = 'http://localhost:3000';

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

    // Add like and comment functionality
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.addEventListener('click', () => {
        likeBook(book.id);
    });
    bookElement.appendChild(likeButton);

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';
    commentButton.addEventListener('click', () => {
        const comment = prompt('Enter your comment:');
        if (comment) {
            addComment(book.id, comment);
        }
    });
    bookElement.appendChild(commentButton);

    // Add favorite button
    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = book.favorite ? 'Remove Favorite' : 'Add Favorite';
    favoriteButton.addEventListener('click', () => {
        toggleFavorite(book.id);
    });
    bookElement.appendChild(favoriteButton);

    // Add bookmark button
    const bookmarkButton = document.createElement('button');
    bookmarkButton.textContent = 'Bookmark Page';
    bookmarkButton.addEventListener('click', () => {
        const pageNumber = prompt('Enter the page number to bookmark:');
        if (pageNumber && !isNaN(pageNumber)) {
            bookmarkPage(book.id, parseInt(pageNumber));
        }
    });
    bookElement.appendChild(bookmarkButton);

    return bookElement;
}

// Function to display books based on category
async function displayBooks(category = '') {
    try {
        const url = category ? `${BASE_URL}/books?category=${category}` : `${BASE_URL}/books`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const books = await response.json();
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
        const response = await fetch(`${BASE_URL}/books/${bookId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        const book = await response.json();
        book.favorite = !book.favorite;
        const updatedResponse = await fetch(`${BASE_URL}/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!updatedResponse.ok) {
            throw new Error('Failed to update book');
        }
        displayBooks(); // Refresh displayed books
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

// Function to add a new comment to a book
async function addComment(bookId, comment) {
    try {
        const response = await fetch(`${BASE_URL}/books/${bookId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        const book = await response.json();
        book.comments.push(comment);
        const updatedResponse = await fetch(`${BASE_URL}/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!updatedResponse.ok) {
            throw new Error('Failed to add comment');
        }
        displayBooks(); // Refresh displayed books
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

// Function to like a book
async function likeBook(bookId) {
    try {
        const response = await fetch(`${BASE_URL}/books/${bookId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        const book = await response.json();
        book.likes++;
        const updatedResponse = await fetch(`${BASE_URL}/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!updatedResponse.ok) {
            throw new Error('Failed to update book likes');
        }
        displayBooks(); // Refresh displayed books
    } catch (error) {
        console.error('Error liking book:', error);
    }
}

// Function to bookmark a page in a book
async function bookmarkPage(bookId, pageNumber) {
    try {
        const response = await fetch(`${BASE_URL}/books/${bookId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        const book = await response.json();
        book.bookmarkedPage = pageNumber;
        const updatedResponse = await fetch(`${BASE_URL}/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!updatedResponse.ok) {
            throw new Error('Failed to update bookmarked page');
        }
        displayBooks(); // Refresh displayed books
    } catch (error) {
        console.error('Error bookmarking page:', error);
    }
}
