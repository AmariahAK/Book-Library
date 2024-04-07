// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Call functions to set up event listeners and initial display
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
        
        // Fetch books data from the server
        const response = await fetch('http://localhost:3000/books');
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const books = await response.json();

        // Filter books by category if provided
        const filteredBooks = category ? books.filter(book => book.category === category) : books;

        // Iterate over filtered books and create book elements
        filteredBooks.forEach(book => {
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

    // Create and append book image
    const img = document.createElement('img');
    img.src = book.imageUrl;
    img.alt = book.title;
    bookElement.appendChild(img);

    // Create and append book title
    const title = document.createElement('h3');
    title.textContent = book.title;
    bookElement.appendChild(title);

    // Create and append book description
    const description = document.createElement('p');
    description.textContent = book.description;
    bookElement.appendChild(description);

    // Create and append like button
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.addEventListener('click', () => {
        likeBook(book.id);
    });
    bookElement.appendChild(likeButton);

    // Create and append comment button
    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';
    commentButton.addEventListener('click', () => {
        const comment = prompt('Enter your comment:');
        if (comment) {
            addComment(book.id, comment);
        }
    });
    bookElement.appendChild(commentButton);

    // Create and append favorite button
    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = book.favorite ? 'Remove Favorite' : 'Add Favorite';
    favoriteButton.addEventListener('click', () => {
        toggleFavorite(book.id);
    });
    bookElement.appendChild(favoriteButton);

    // Create and append bookmark button
    const bookmarkButton = document.createElement('button');
    bookmarkButton.textContent = 'Bookmark';
    bookmarkButton.addEventListener('click', () => {
        const pageNumber = prompt('Enter the page number to bookmark:');
        if (pageNumber && !isNaN(pageNumber)) {
            bookmarkPage(book.id, parseInt(pageNumber));
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

// Function to like a book
async function likeBook(bookId) {
    try {
        const response = await fetch(`http://localhost:3000/books/${bookId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        const book = await response.json();
        book.likes++;
        const updateResponse = await fetch(`http://localhost:3000/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!updateResponse.ok) {
            throw new Error('Failed to update book');
        }
        displayBooks(); // Refresh displayed books
    } catch (error) {
        console.error('Error liking book:', error);
    }
}

// Function to add a comment to a book
async function addComment(bookId, comment) {
    try {
        const response = await fetch(`http://localhost:3000/books/${bookId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        const book = await response.json();
        book.comments.push(comment);
        const updateResponse = await fetch(`http://localhost:3000/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!updateResponse.ok) {
            throw new Error('Failed to add comment');
        }
        displayBooks(); // Refresh displayed books
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

// Function to toggle the favorite status of a book
async function toggleFavorite(bookId) {
    try {
        const response = await fetch(`http://localhost:3000/books/${bookId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        const book = await response.json();
        book.favorite = !book.favorite;
        const updateResponse = await fetch(`http://localhost:3000/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!updateResponse.ok) {
            throw new Error('Failed to update book');
        }
        displayBooks(); // Refresh displayed books
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

// Function to bookmark a page in a book
async function bookmarkPage(bookId, pageNumber) {
    try {
        const response = await fetch(`http://localhost:3000/books/${bookId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        const book = await response.json();
        book.bookmarkedPage = pageNumber;
        const updateResponse = await fetch(`http://localhost:3000/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!updateResponse.ok) {
            throw new Error('Failed to update bookmark');
        }
        displayBooks(); // Refresh displayed books
    } catch (error) {
        console.error('Error bookmarking page:', error);
    }
}
