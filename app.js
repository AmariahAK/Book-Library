// Book data (id, title, description, category, imageUrl, favorite, bookmarkedPage, likes, comments)
let books = [
    { id: 1, title: "Goodnight Moon", description: "A classic bedtime story.", category: "Kids", imageUrl: "images/Goodnight Moon.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 2, title: "Where the Wild Things Are", description: "Story of adventure and imagination.", category: "Kids", imageUrl: "images/Where the Wild Things Are.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    // Add more books here...
];

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

    // Add like button
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.addEventListener('click', () => {
        book.likes++;
        displayBooks();
    });
    bookElement.appendChild(likeButton);

    // Add comment button
    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';
    commentButton.addEventListener('click', () => {
        const comment = prompt('Enter your comment:');
        if (comment) {
            book.comments.push(comment);
            displayBooks();
        }
    });
    bookElement.appendChild(commentButton);

    // Add favorite button
    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = book.favorite ? 'Remove Favorite' : 'Add Favorite';
    favoriteButton.addEventListener('click', () => {
        book.favorite = !book.favorite;
        favoriteButton.textContent = book.favorite ? 'Remove Favorite' : 'Add Favorite';
        displayBooks();
    });
    bookElement.appendChild(favoriteButton);

    // Add bookmark button
    const bookmarkButton = document.createElement('button');
    bookmarkButton.textContent = 'Bookmark Page';
    bookmarkButton.addEventListener('click', () => {
        const pageNumber = prompt('Enter the page number to bookmark:');
        if (pageNumber && !isNaN(pageNumber)) {
            book.bookmarkedPage = parseInt(pageNumber);
            displayBooks();
        }
    });
    bookElement.appendChild(bookmarkButton);

    return bookElement;
}

// Function to display books based on category or search term
function displayBooks(category = '', searchTerm = '') {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = ''; // Clear previous books

    const filteredBooks = books.filter(book => {
        const matchesCategory = category ? book.category === category : true;
        const matchesSearch = searchTerm ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        return matchesCategory && matchesSearch;
    });

    filteredBooks.forEach(book => {
        const bookElement = createBookElement(book);
        bookContainer.appendChild(bookElement);
    });
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

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    displayBooks('', searchTerm); // Display books based on search term
});

// Favorite book functionality
function toggleFavorite(bookId) {
    const book = books.find(book => book.id === bookId);
    if (book) {
        book.favorite = !book.favorite;
        displayBooks();
    }
}

// Bookmark page functionality
function bookmarkPage(bookId, pageNumber) {
    const book = books.find(book => book.id === bookId);
    if (book) {
        book.bookmarkedPage = pageNumber;
        displayBooks();
    }
}

// Add book functionality
function addBook(title, description, category, imageUrl) {
    const newBook = {
        id: books.length + 1,
        title,
        description,
        category,
        imageUrl,
        favorite: false,
        bookmarkedPage: 0,
        likes: 0,
        comments: []
    };

    books.push(newBook);
    displayBooks();
}
