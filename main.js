// Global Constants
const BASE_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual Google Books API key

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

        // Construct the API URL based on category or search query
        let url;
        if (query) {
            url = `${BASE_URL}/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`;
        } else {
            url = `${BASE_URL}/volumes?key=${API_KEY}`;
        }

        // Fetch books data from the Google Books API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        const books = data.items || [];

        // Iterate over fetched books and create book elements
        books.forEach(book => {
            const bookElement = createBookElement(book);
            booksContainer.appendChild(bookElement);
        });
    } catch (error) {
        console.error('Error displaying books:', error);
    }
}

// Function to create a book element and attach event listeners
function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    // Extract book details from the Google Books API response
    const volumeInfo = book.volumeInfo || {};
    const { title, description, imageLinks } = volumeInfo;
    const imageUrl = imageLinks ? imageLinks.thumbnail : '';

    // Create and append book image
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title || 'Book Image';
    bookElement.appendChild(img);

    // Create and append book title
    const bookTitle = document.createElement('h3');
    bookTitle.textContent = title || 'Untitled';
    bookElement.appendChild(bookTitle);

    // Create and append book description
    const bookDescription = document.createElement('p');
    bookDescription.textContent = description || 'No description available';
    bookElement.appendChild(bookDescription);

    // Create and append like button (displayed as heart icon)
    const likeButton = document.createElement('button');
    likeButton.innerHTML = '&hearts;'; // Heart icon
    likeButton.addEventListener('click', () => {
        likeBook(book.id);
    });
    bookElement.appendChild(likeButton);

    // Create and append favorite button (displayed as star icon)
    const favoriteButton = document.createElement('button');
    favoriteButton.innerHTML = '&#9733;'; // Star icon
    favoriteButton.addEventListener('click', () => {
        toggleFavorite(book.id);
    });
    bookElement.appendChild(favoriteButton);

    // Create and append bookmark button (displayed as bookmark icon)
    const bookmarkButton = document.createElement('button');
    bookmarkButton.innerHTML = '&#128278;'; // Bookmark icon
    bookmarkButton.addEventListener('click', () => {
        const pageNumber = prompt('Enter the page number to bookmark:');
        if (pageNumber && !isNaN(pageNumber)) {
            bookmarkPage(book.id, parseInt(pageNumber));
        }
    });
    bookElement.appendChild(bookmarkButton);

    return bookElement;
}

// Function to handle clicking genre buttons and search
function addGenreEventListeners() {
    const genreButtons = document.querySelectorAll('.genre-button');
    genreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const genre = button.dataset.genre;
            displayBooks(genre); // Display books based on selected genre
        });
    });
}

// Function to toggle visibility of add book dropdown content
function toggleAddBookDropdown() {
    const addBookDropdownContent = document.getElementById('addBookDropdownContent');
    if (!addBookDropdownContent) {
        console.error('Add book dropdown content not found');
        return;
    }

    if (addBookDropdownContent.style.display === 'flex') {
        addBookDropdownContent.style.display = 'none';
    } else {
        addBookDropdownContent.style.display = 'flex';
    }
}

// Function to perform search based on input text
function performSearch() {
    const searchInput = document.getElementById('searchInput').value.trim();
    displayBooks(searchInput); // Display books based on search input
}

// Function to toggle visibility of genre dropdown content
function toggleGenreDropdown() {
    const dropdownContent = document.getElementById('genreDropdownContent');
    if (!dropdownContent) {
        console.error('Genre dropdown content not found');
        return;
    }

    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
    } else {
        dropdownContent.style.display = 'block';
    }
}

// Function to add a new book
async function addNewBook() {
    const titleInput = document.getElementById('titleInput').value.trim();
    const descriptionInput = document.getElementById('descriptionInput').value.trim();
    const categorySelect = document.getElementById('categorySelect').value;
    const imageInput = document.getElementById('imageInput').value.trim();

    // Implement logic to add a new book using input values
    console.log('Adding new book:', { title: titleInput, description: descriptionInput, category: categorySelect, imageUrl: imageInput });
    // Example: Make an API request to add the book to your library
}

// Function to toggle the favorite status of a book
async function toggleFavorite(bookId) {
    try {
        // Implement your favorite toggle logic here
        console.log(`Toggle favorite for book with ID ${bookId}`);
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

// Function to add a comment to a book
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
