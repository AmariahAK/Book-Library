// Define the book data array
const books = [
    { id: 1, title: "Goodnight Moon", description: "A classic bedtime story.", category: "Kids", imageUrl: "images/Goodnight Moon.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 2, title: "Where the Wild Things Are", description: "Story of adventure and imagination.", category: "Kids", imageUrl: "images/Where the Wild Things Are.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 3, title: "The Very Hungry Caterpillar", description: "A caterpillar's journey of transformation.", category: "Kids", imageUrl: "images/The Very Hungry Caterpillar.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 4, title: "Hamilton: The Revolution", description: "Behind-the-scenes of the hit musical.", category: "Musicals", imageUrl: "images/Hamilton The Revolution.jpeg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 5, title: "Les Misérables", description: "Epic tale of love and sacrifice.", category: "Musicals", imageUrl: "images/Les Misérables.jpeg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 6, title: "Wicked: The Grimmerie", description: "Companion book to the musical.", category: "Musicals", imageUrl: "images/Wicked The Grimmerie.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 7, title: "Jurassic Park", description: "Dinosaurs on the loose!", category: "Action", imageUrl: "images/Jurassic Park.png", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 8, title: "The Bourne Identity", description: "Action-packed spy thriller.", category: "Action", imageUrl: "images/The Bourne Identity.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 9, title: "The Hunger Games", description: "Survival in a dystopian world.", category: "Action", imageUrl: "images/The Hunger Games.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 10, title: "Harry Potter and the Sorcerer's Stone", description: "Wizarding world adventure.", category: "Fantasy", imageUrl: "images/Harry Potter and the Sorcerer's Stone.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 11, title: "The Hobbit", description: "Journey to reclaim treasure.", category: "Fantasy", imageUrl: "images/The Hobbit.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 12, title: "The Shining", description: "Psychological horror at the Overlook Hotel.", category: "Horror", imageUrl: "images/The Shining.jpeg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 13, title: "The Silence of the Lambs", description: "Psychological thriller about a cannibalistic serial killer.", category: "Thriller", imageUrl: "images/The Silent Patient.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 14, title: "Gone Girl", description: "Mystery thriller about a missing wife.", category: "Thriller", imageUrl: "images/Gone Girl.jpeg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 15, title: "Shutter Island", description: "Mind-bending mystery on a secluded island.", category: "Thriller", imageUrl: "images/Shutter Island.jpeg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 16, title: "The Girl with the Dragon Tattoo", description: "Investigative crime thriller.", category: "Thriller", imageUrl: "images/The Girl with the Dragon Tattoo.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 17, title: "The Power of Now", description: "Guide to spiritual enlightenment.", category: "Self Help", imageUrl: "images/The Power of Now.png", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 18, title: "Atomic Habits", description: "Build good habits, break bad ones.", category: "Self Help", imageUrl: "images/Atomic Habits.jpg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 19, title: "Daring Greatly", description: "Embrace vulnerability to transform your life.", category: "Self Help", imageUrl: "images/Daring Greatly.jpeg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 20, title: "Pride and Prejudice", description: "Classic romantic novel by Jane Austen.", category: "Romance", imageUrl: "images/Pride and Prejudice.jpeg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 21, title: "Me Before You", description: "Heartwarming love story.", category: "Romance", imageUrl: "images/Me Before You.jpeg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] },
    { id: 22, title: "The Notebook", description: "Tale of everlasting love.", category: "Romance", imageUrl: "images/The Notebook.jpeg", favorite: false, bookmarkedPage: 0, likes: 0, comments: [] }
];

// Function to create a book element with like, comment, favorite, and bookmark functionalities
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
        displayBooks(); // Update displayed books
    });
    bookElement.appendChild(likeButton);

    // Add comment button
    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';
    commentButton.addEventListener('click', () => {
        const comment = prompt('Enter your comment:');
        if (comment) {
            book.comments.push(comment);
            displayBooks(); // Update displayed books
        }
    });
    bookElement.appendChild(commentButton);

    // Add favorite button
    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = book.favorite ? 'Remove Favorite' : 'Add Favorite';
    favoriteButton.addEventListener('click', () => {
        book.favorite = !book.favorite;
        favoriteButton.textContent = book.favorite ? 'Remove Favorite' : 'Add Favorite';
        displayBooks(); // Update displayed books
    });
    bookElement.appendChild(favoriteButton);

    // Add bookmark button
    const bookmarkButton = document.createElement('button');
    bookmarkButton.textContent = 'Bookmark Page';
    bookmarkButton.addEventListener('click', () => {
        const pageNumber = prompt('Enter the page number to bookmark:');
        if (pageNumber && !isNaN(pageNumber)) {
            book.bookmarkedPage = parseInt(pageNumber);
            displayBooks(); // Update displayed books
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

// Event listener for genre buttons
function addGenreEventListeners() {
    const genreButtons = document.querySelectorAll('.genre-button');
    genreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const genre = button.dataset.genre;
            displayBooks(genre); // Display books based on selected genre
        });
    });
}

// Event listener for search input
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
        displayBooks('', searchTerm); // Display books based on search term
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    displayBooks(); // Display all books by default
    addGenreEventListeners(); // Add event listeners to genre buttons
    setupSearch(); // Setup search functionality
});
