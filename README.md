
# Book Library Web Application

Welcome to the Book Library Web Application! This project is a Single Page Application (SPA) designed to provide users with a seamless experience for searching and managing their favorite books. Leveraging the Google Books API, users can explore a vast collection of books, add them to their favorites, and perform various interactions within the application.

---

## Project Overview

The primary objective of this project is to develop a frontend web application using HTML, CSS, and JavaScript, coupled with asynchronous API calls to the Google Books API. By integrating with this API, users can search for books using keywords, view detailed information about each book, and manage their favorites list persistently using json-server for data storage.

---

## Learning Goals

- **Design and User Experience**: Create an intuitive and visually appealing interface that facilitates seamless book discovery and management.
- **API Integration and Asynchronous JavaScript**: Implement asynchronous JavaScript to communicate with the Google Books API, enabling dynamic content updates.
- **Data Persistence with json-server**: Utilize json-server to manage user interactions and maintain favorite books across sessions.
- **Project Collaboration and Iterative Development**: Collaborate effectively with instructors and peers to iterate on the Minimum Viable Product (MVP) and incorporate feedback for improvement.
- **Problem Solving and Debugging**: Address issues encountered during development and apply debugging techniques to refine the application.

---

## Features

- **Book Search**: Utilize the Google Books API to search for books based on keywords and display relevant results.
- **Search Results Display**: Showcase book covers, titles, authors, and descriptions in an organized manner for easy browsing.
- **Favorite Books Management**: Enable users to add books to their favorites list, remove books, and perform CRUD operations seamlessly.
- **Responsive Design**: Implement a responsive layout to ensure optimal viewing across various devices and screen sizes.

---

## Getting Started

To run this application locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/book-library.git
   ```

2. Navigate to the project directory:

   ```bash
   cd book-library
   ```

3. Install dependencies:

   ```bash
   npm install -g json-server
   ```

4. Start the json-server for data persistence:

   ```bash
   json-server --watch db.json --port 3001
   ```

5. Open `index.html` in your preferred web browser to access the application.

---

## Contact

For inquiries or feedback regarding this project, please reach out to:

**Amariah Kamau**  
- Phone: 0759336068  
- Email: amariah.abish@gmail.com

---

## Additional Considerations

### Data Persistence with json-server

The application employs json-server to manage and persist user favorite books. This allows for seamless interaction with user data even after refreshing the page or revisiting the application.

### Advanced Features (Stretch Goals)

- **Pagination and Filtering**: Enhance the search experience by implementing pagination and filtering options for search results.
- **Personalized Recommendations**: Explore additional API features to provide personalized book recommendations based on user preferences and browsing history.

---

## Acknowledgments

This project was developed as part of a school assignment to showcase proficiency in frontend development, API integration, and data management using JavaScript. Special thanks to instructors and peers for their guidance and support throughout the project.

Feel free to explore and customize this application further. Your feedback and suggestions are greatly appreciated for continuous improvement and refinement. Enjoy discovering new books with the Book Library Web Application!
