// Global Constants
const BASE_URL = 'http://localhost:3000'; // Assuming local server URL

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks(); // Display all books initially
    addGenreEventListeners(); // Add event listeners to genre buttons
});

// Function to fetch and display books
async function fetchBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        const books = response.data;
        displayBooks(books);
        populateGenresDropdown(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to fetch books. Please try again.');
    }
}

// Function to display books based on genre or search query
async function displayBooks(query = '') {
    try {
        const response = await axios.get(query ? `${BASE_URL}/books?genre=${query}` : `${BASE_URL}/books`);
        const books = response.data;
        const booksContainer = document.getElementById('book-container');
        if (!booksContainer) return;

        booksContainer.innerHTML = '';

        books.forEach(book => {
            const bookElement = createBookElement(book);
            booksContainer.appendChild(bookElement);
        });
    } catch (error) {
        console.error('Error displaying books:', error);
        alert('Failed to display books. Please try again.');
    }
}

// Function to create a book element
function createBookElement(book) {
    const { title, description, genre, image } = book;

    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const bookTitle = document.createElement('h3');
    bookTitle.textContent = title || 'Untitled';
    bookElement.appendChild(bookTitle);

    const bookDescription = document.createElement('p');
    bookDescription.textContent = description || 'No description available';
    bookElement.appendChild(bookDescription);

    const bookGenre = document.createElement('p');
    bookGenre.textContent = `Genre: ${genre || 'Unknown'}`;
    bookElement.appendChild(bookGenre);

    const img = document.createElement('img');
    img.src = image || 'https://via.placeholder.com/150';
    img.alt = title || 'Book Image';
    img.style.width = '150px';
    bookElement.appendChild(img);

    // Like button
    const likeButton = createButton('Like', async () => {
        await likeBook(title);
        const updatedBook = await fetchBookByTitle(title);
        updateLikesCount(bookElement, updatedBook.likes);
    });
    bookElement.appendChild(likeButton);

    // Comment button
    const commentButton = createButton('Comment', () => {
        const comment = prompt('Enter your comment:');
        if (comment) {
            addComment(title, comment)
                .then(() => displayComments(bookElement, comment));
        }
    });
    bookElement.appendChild(commentButton);

    return bookElement;
}

// Helper function to create a button with click event listener
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

// Function to populate genres dropdown
function populateGenresDropdown(books) {
    const genreDropdown = document.getElementById('genreDropdown');
    if (!genreDropdown) return;

    const genres = [...new Set(books.map(book => book.genre))];
    genres.forEach(genre => {
        const genreLink = document.createElement('a');
        genreLink.href = '#';
        genreLink.textContent = genre;
        genreLink.onclick = () => filterBooksByGenre(genre);
        genreDropdown.appendChild(genreLink);
    });
}

// Function to update the likes count display
function updateLikesCount(bookElement, likes) {
    const likeButton = bookElement.querySelector('button');
    likeButton.textContent = `Like (${likes})`;
}

// Function to display comments for a book
function displayComments(bookElement, comment) {
    const commentsSection = document.createElement('div');
    commentsSection.textContent = comment;
    bookElement.appendChild(commentsSection);
}

// Function to fetch book details by title
async function fetchBookByTitle(title) {
    try {
        const response = await axios.get(`${BASE_URL}/books?title=${title}`);
        return response.data[0];
    } catch (error) {
        console.error('Error fetching book by title:', error);
        return null;
    }
}

// Function to add a new book
async function addNewBook(event) {
    event.preventDefault();

    const title = prompt('Enter book title:');
    const description = prompt('Enter book description:');
    const genre = prompt('Enter book genre:');
    const image = prompt('Enter image URL:');

    const newBook = {
        title,
        description,
        genre,
        image,
        likes: 0 // Initialize likes count for the new book
    };

    try {
        await axios.post(`${BASE_URL}/books`, newBook);
        alert('Book added successfully!');
        fetchBooks(); // Refresh books display after adding a new book
    } catch (error) {
        console.error('Error adding new book:', error);
        alert('Failed to add new book. Please try again.');
    }
}

// Function to like a book
async function likeBook(title) {
    try {
        const book = await fetchBookByTitle(title);
        if (!book) return;

        book.likes += 1;
        await axios.put(`${BASE_URL}/books/${book.id}`, book);
        return book.likes;
    } catch (error) {
        console.error('Error liking book:', error);
        return 0;
    }
}

// Function to add a comment to a book
async function addComment(title, comment) {
    try {
        const book = await fetchBookByTitle(title);
        if (!book) return;

        if (!book.comments) {
            book.comments = [];
        }
        book.comments.push(comment);

        await axios.put(`${BASE_URL}/books/${book.id}`, book);
        return true;
    } catch (error) {
        console.error('Error adding comment:', error);
        return false;
    }
}

// Function to bookmark a page in a book
async function bookmarkPage(title, pageNumber) {
    try {
        const book = await fetchBookByTitle(title);
        if (!book) return;

        book.bookmark = pageNumber;
        await axios.put(`${BASE_URL}/books/${book.id}`, book);
        alert(`Page ${pageNumber} bookmarked successfully!`);
    } catch (error) {
        console.error('Error bookmarking page:', error);
        alert('Failed to bookmark page. Please try again.');
    }
}

// Function to filter books by genre
function filterBooksByGenre(genre) {
    displayBooks(genre);
}
