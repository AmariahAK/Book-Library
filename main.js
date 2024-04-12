// Global Constants
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1';
const API_KEY = 'AIzaSyDREw30aFfJweL9yMTjVPcSN6-xdmqkoNE'; // Replace with your Google Books API key

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    displayBooks(); // Display all books initially
    addGenreEventListeners(); // Add event listeners to genre buttons
});

// Function to display books based on category or search query
async function displayBooks(query = '') {
    try {
        const booksContainer = document.getElementById('book-container');
        if (!booksContainer) {
            console.error('Books container not found');
            return;
        }

        booksContainer.innerHTML = ''; // Clear previous books

        let apiUrl;
        if (query) {
            // If a query is provided, perform a search using Google Books API
            apiUrl = `${GOOGLE_BOOKS_API}/volumes?q=${query}&key=${API_KEY}`;
        } else {
            // Otherwise, fetch books for a specific category (genre)
            apiUrl = `${GOOGLE_BOOKS_API}/volumes?q=subject:fiction&key=${API_KEY}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const { items } = await response.json() || [];

        items.forEach(item => {
            const bookElement = createBookElement(item);
            booksContainer.appendChild(bookElement);
        });
    } catch (error) {
        console.error('Error displaying books:', error);
        alert('Failed to fetch books. Please try again later.');
    }
}

// Function to create a book element and attach event listeners
function createBookElement(book) {
    const { volumeInfo } = book;
    const { title, description, categories, imageLinks } = volumeInfo;
    const imageUrl = imageLinks ? imageLinks.thumbnail : 'https://via.placeholder.com/150';

    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const bookTitle = document.createElement('h3');
    bookTitle.textContent = title || 'Untitled';
    bookElement.appendChild(bookTitle);

    const bookDescription = document.createElement('p');
    bookDescription.textContent = description || 'No description available';
    bookElement.appendChild(bookDescription);

    const bookGenre = document.createElement('p');
    bookGenre.textContent = `Genre: ${categories ? categories.join(', ') : 'Unknown'}`;
    bookElement.appendChild(bookGenre);

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title || 'Book Image';
    img.style.width = '150px';
    bookElement.appendChild(img);

    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments');
    commentsSection.textContent = 'No comments yet.';
    bookElement.appendChild(commentsSection);

    const likeButton = createButton('Like', () => likeBook(title));
    const commentButton = createButton('Comment', () => {
        const comment = prompt('Enter your comment:');
        if (comment) {
            addComment(title, comment);
        }
    });
    const favoriteButton = createButton('Favorite', () => toggleFavorite(title));
    const bookmarkButton = createButton('Bookmark', () => {
        const pageNumber = prompt('Enter the page number to bookmark:');
        if (pageNumber && !isNaN(pageNumber)) {
            bookmarkPage(title, parseInt(pageNumber));
        }
    });

    bookElement.appendChild(likeButton);
    bookElement.appendChild(commentButton);
    bookElement.appendChild(favoriteButton);
    bookElement.appendChild(bookmarkButton);

    return bookElement;
}

// Helper function to create a button with click event listener
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

// Function to handle clicking genre buttons
function addGenreEventListeners() {
    const genreButtons = document.querySelectorAll('.genre-button');
    genreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const genre = button.dataset.genre;
            displayBooks(genre); // Display books based on selected genre
        });
    });
}

// Function to toggle the favorite status of a book
async function toggleFavorite(bookTitle) {
    try {
        // Implement favorite toggle logic here
        console.log(`Toggle favorite for book: ${bookTitle}`);
        alert('Book favorite toggled successfully!');
    } catch (error) {
        console.error('Error toggling favorite:', error);
        alert('Failed to toggle favorite. Please try again.');
    }
}

// Function to add a comment to a book
async function addComment(bookTitle, comment) {
    try {
        // Implement comment adding logic here
        console.log(`Add comment "${comment}" to book: ${bookTitle}`);
        alert('Comment added successfully!');
    } catch (error) {
        console.error('Error adding comment:', error);
        alert('Failed to add comment. Please try again.');
    }
}

// Function to like a book
async function likeBook(bookTitle) {
    try {
        // Implement like functionality here
        console.log(`Like book: ${bookTitle}`);
        alert('Book liked successfully!');
    } catch (error) {
        console.error('Error liking book:', error);
        alert('Failed to like book. Please try again.');
    }
}

// Function to bookmark a page in a book
async function bookmarkPage(bookTitle, pageNumber) {
    try {
        // Implement bookmarking functionality here
        console.log(`Bookmark page ${pageNumber} of book: ${bookTitle}`);
        alert(`Page ${pageNumber} bookmarked successfully!`);
    } catch (error) {
        console.error('Error bookmarking page:', error);
        alert('Failed to bookmark page. Please try again.');
    }
}
