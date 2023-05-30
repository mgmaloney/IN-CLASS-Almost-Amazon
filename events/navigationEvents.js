import { signOut } from '../utils/auth';
import { getBooks, booksOnSale } from '../api/bookData';
import { showBooks, emptyBooks } from '../pages/books';
import { getAuthors } from '../api/authorData';
import { showAuthors, emptyAuthors } from '../pages/authors';
import clearDom from '../utils/clearDom';

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button').addEventListener('click', signOut);
  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', async () => {
    console.warn('CLICKED SALE BOOKS');
    const saleBooks = await booksOnSale();
    if (saleBooks.length > 0) {
      showBooks(saleBooks);
    } else {
      emptyBooks();
    }
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', async () => {
    console.warn('CLICKED ALL BOOKS');
    const books = await getBooks(`${user.uid}`);
    if (books.length > 0) {
      getBooks(`${user.uid}`).then(showBooks);
    } else {
      emptyBooks();
    }
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', async () => {
    console.warn('CLICKED AUTHORS');
    clearDom();
    const authors = await getAuthors(`${user.uid}`);
    if (authors.length > 0) {
      getAuthors(`${user.uid}`).then(showAuthors);
    } else {
      emptyAuthors();
    }
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
