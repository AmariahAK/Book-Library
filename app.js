// Book data (title, description, category, imageUrl)
let books = [
    { id: 1, title: "Goodnight Moon", description: "A classic bedtime story.", category: "Kids", imageUrl: "images/Goodnight Moon.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 2, title: "Where the Wild Things Are", description: "Story of adventure and imagination.", category: "Kids", imageUrl: "images/Where the Wild Things Are.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    // Add more books here...
];

// Display all books by default
displayBooks();

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
        book.likes++;
        displayBooks();
    });
    bookElement.appendChild(likeButton);

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

// Function to display books based on category and search
function displayBooks(category = '', searchTerm = '') {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = ''; // Clear previous books

    let filteredBooks = books;

    // Filter by category
    if (category) {
        filteredBooks = filteredBooks.filter(book => book.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by search term (title or ID)
    if (searchTerm) {
        filteredBooks = filteredBooks.filter(book => {
            const searchTermLower = searchTerm.toLowerCase();
            return book.title.toLowerCase().includes(searchTermLower) || book.id.toString() === searchTermLower;
        });
    }

    // Display filtered books
    filteredBooks.forEach(book => {
        const bookElement = createBookElement(book);
        bookContainer.appendChild(bookElement);
    });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    displayBooks('', searchTerm);
});

// Favorite book functionality
function toggleFavorite(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex].favorite = !books[bookIndex].favorite;
        displayBooks();
    }
}

// Bookmark page functionality
function bookmarkPage(bookId, pageNumber) {
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex].bookmarkedPage = pageNumber;
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
