// Global Constants
const BASE_URL = 'https://simple-books-api.glitch.me';

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    displayBooks(); // Display all books initially
    addGenreEventListeners(); // Add event listeners to genre buttons
});

// Function to display books based on category
async function displayBooks(category = '') {
    try {
        const booksContainer = document.getElementById('book-container');
        if (!booksContainer) {
            console.error('Books container not found');
            return;
        }

        booksContainer.innerHTML = ''; // Clear previous books
        
        // Construct the API URL based on category
        const apiUrl = category ? `${BASE_URL}/books?category=${category}` : `${BASE_URL}/books`;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/' + apiUrl; // Prepend with CORS Anywhere proxy URL
        
        // Fetch books data using the CORS proxy
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        const books = data || []; // Assuming books data is an array of book objects

        // Iterate over fetched books and create book elements
        books.forEach(book => {
            const bookElement = createBookElement(book);
            booksContainer.appendChild(bookElement);
        });
    } catch (error) {
        console.error('Error displaying books:', error);
        alert('Failed to fetch books. Please try again later.');
    }
}

// Function to create a book element and attach event listeners
function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    // Extract book details from the book object
    const { name, description, genre } = book;

    // Create and append book title
    const bookTitle = document.createElement('h3');
    bookTitle.textContent = name || 'Untitled';
    bookElement.appendChild(bookTitle);

    // Create and append book description
    const bookDescription = document.createElement('p');
    bookDescription.textContent = description || 'No description available';
    bookElement.appendChild(bookDescription);

    // Create and append book genre
    const bookGenre = document.createElement('p');
    bookGenre.textContent = `Genre: ${genre || 'Unknown'}`;
    bookElement.appendChild(bookGenre);

    // Create and append book image (with placeholder)
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/150'; // Placeholder image URL
    img.alt = name || 'Book Image';
    img.style.width = '150px'; // Set image width for consistency
    bookElement.appendChild(img);

    // Create and append like button
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.addEventListener('click', () => {
        likeBook(book.id); // Assuming book object has an ID property
    });
    bookElement.appendChild(likeButton);

    // Create and append comment button
    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';
    commentButton.addEventListener('click', () => {
        const comment = prompt('Enter your comment:');
        if (comment) {
            addComment(book.id, comment); // Assuming book object has an ID property
        }
    });
    bookElement.appendChild(commentButton);

    // Create and append favorite button
    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = 'Favorite';
    favoriteButton.addEventListener('click', () => {
        toggleFavorite(book.id); // Assuming book object has an ID property
    });
    bookElement.appendChild(favoriteButton);

    // Create and append bookmark button
    const bookmarkButton = document.createElement('button');
    bookmarkButton.textContent = 'Bookmark';
    bookmarkButton.addEventListener('click', () => {
        const pageNumber = prompt('Enter the page number to bookmark:');
        if (pageNumber && !isNaN(pageNumber)) {
            bookmarkPage(book.id, parseInt(pageNumber)); // Assuming book object has an ID property
        }
    });
    bookElement.appendChild(bookmarkButton);

    return bookElement;
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
async function toggleFavorite(bookId) {
    try {
        // Implement your favorite toggle logic here
        console.log(`Toggle favorite for book with ID ${bookId}`);
    } catch (error) {
        console.error('Error toggling favorite:', error);
        alert('Failed to toggle favorite. Please try again.');
    }
}

// Function to add a comment to a book
async function addComment(bookId, comment) {
    try {
        // Implement your comment adding logic here
        console.log(`Add comment "${comment}" to book with ID ${bookId}`);
        alert('Comment added successfully!');
    } catch (error) {
        console.error('Error adding comment:', error);
        alert('Failed to add comment. Please try again.');
    }
}

// Function to like a book
async function likeBook(bookId) {
    try {
        // Implement your like functionality here
        console.log(`Like book with ID ${bookId}`);
        alert('Book liked successfully!');
    } catch (error) {
        console.error('Error liking book:', error);
        alert('Failed to like book. Please try again.');
    }
}

// Function to bookmark a page in a book
async function bookmarkPage(bookId, pageNumber) {
    try {
        // Implement your bookmarking functionality here
        console.log(`Bookmark page ${pageNumber} of book with ID ${bookId}`);
        alert(`Page ${pageNumber} bookmarked successfully!`);
    } catch (error) {
        console.error('Error bookmarking page:', error);
        alert('Failed to bookmark page. Please try again.');
    }
}
