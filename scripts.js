// Book data (title, description, category, imageUrl)
const books = [
    { title: "Goodnight Moon", description: "A classic bedtime story.", category: "Kids", imageUrl: "images/Goodnight Moon.jpg" },
    { title: "Where the Wild Things Are", description: "Story of adventure and imagination.", category: "Kids", imageUrl: "images/Where the Wild Things Are.jpg" },
    { title: "The Very Hungry Caterpillar", description: "A caterpillar's journey of transformation.", category: "Kids", imageUrl: "images/The Very Hungry Caterpillar.jpg" },
    { title: "Hamilton: The Revolution", description: "Behind-the-scenes of the hit musical.", category: "Musicals", imageUrl: "images/Hamilton The Revolution.jpeg" },
    { title: "Les Misérables", description: "Epic tale of love and sacrifice.", category: "Musicals", imageUrl: "images/Les Misérables.jpeg" },
    { title: "Wicked: The Grimmerie", description: "Companion book to the musical.", category: "Musicals", imageUrl: "images/Wicked The Grimmerie.jpg" },
    { title: "Jurassic Park", description: "Dinosaurs on the loose!", category: "Action", imageUrl: "images/Jurassic Park.png" },
    { title: "The Bourne Identity", description: "Action-packed spy thriller.", category: "Action", imageUrl: "images/The Bourne Identity.jpg" },
    { title: "The Hunger Games", description: "Survival in a dystopian world.", category: "Action", imageUrl: "images/The Hunger Games.jpg" },
    { title: "Harry Potter and the Sorcerer's Stone", description: "Wizarding world adventure.", category: "Fantasy", imageUrl: "images/Harry Potter and the Sorcerer's Stone.jpg" },
    { title: "The Hobbit", description: "Journey to reclaim treasure.", category: "Fantasy", imageUrl: "images/The Hobbit.jpg" },
    { title: "The Shining", description: "Psychological horror at the Overlook Hotel.", category: "Horror", imageUrl: "images/The Shining.jpeg" },
    { title: "The Silence of the Lambs", description: "Psychological thriller about a cannibalistic serial killer.", category: "Thriller", imageUrl: "images/The Silent Patient.jpg" },
    { title: "Gone Girl", description: "Mystery thriller about a missing wife.", category: "Thriller", imageUrl: "images/Gone Girl.jpeg" },
    { title: "Shutter Island", description: "Mind-bending mystery on a secluded island.", category: "Thriller", imageUrl: "images/Shutter Island.jpeg" },
    { title: "The Girl with the Dragon Tattoo", description: "Investigative crime thriller.", category: "Thriller", imageUrl: "images/The Girl with the Dragon Tattoo.jpg" },
    { title: "The Power of Now", description: "Guide to spiritual enlightenment.", category: "Self Help", imageUrl: "images/The Power of Now.png" },
    { title: "Atomic Habits", description: "Build good habits, break bad ones.", category: "Self Help", imageUrl: "images/Atomic Habits.jpg" },
    { title: "Daring Greatly", description: "Embrace vulnerability to transform your life.", category: "Self Help", imageUrl: "images/Daring Greatly .jpeg" },
    { title: "Pride and Prejudice", description: "Classic romantic novel by Jane Austen.", category: "Romance", imageUrl: "images/Pride and Prejudice.jpeg" },
    { title: "Me Before You", description: "Heartwarming love story.", category: "Romance", imageUrl: "images/Me Before You.jpeg" },
    { title: "The Notebook", description: "Tale of everlasting love.", category: "Romance", imageUrl: "images/The Notebook.jpeg" }
];

// Function to display books based on category
function displayBooks(category = '') {
    const bookContainer = document.getElementById('book-container');
    bookContainer.innerHTML = ''; // Clear previous books

    const filteredBooks = category ? books.filter(book => book.category === category) : books;

    filteredBooks.forEach(book => {
        const bookElement = createBookElement(book);
        bookContainer.appendChild(bookElement);
    });
}

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

    return bookElement;
}

// Initial display of all books
displayBooks(); // Display all books by default
