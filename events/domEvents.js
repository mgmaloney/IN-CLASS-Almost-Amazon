import { deleteBook, getBooks, getSingleBook } from '../api/bookData';
import { showBooks } from '../pages/books';
import {
  getAuthors,
  getSingleAuthor,
  getAuthorBooks,
  updateAuthor,
} from '../api/authorData';
import { showAuthors } from '../pages/authors';
import {
  getBookDetails,
  deleteAuthorBooksRelationship,
} from '../api/mergedData';
// import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import viewBook from '../pages/viewBook';
import showAuthorsBooks from '../pages/viewAuthor';

const domEvents = (user) => {
  document
    .querySelector('#main-container')
    .addEventListener('click', async (e) => {
      // TODO: CLICK EVENT FOR DELETING A BOOK
      if (e.target.id.includes('delete-book')) {
        // eslint-disable-next-line no-alert
        if (window.confirm('Want to delete?')) {
          console.warn('CLICKED DELETE BOOK', e.target.id);
          console.warn(e.target.id.split('--'));
          const [, firebaseKey] = e.target.id.split('--');
          deleteBook(firebaseKey).then(() => {
            getBooks(`${user.uid}`).then(showBooks);
          });
        }
      }

      // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
      if (e.target.id.includes('add-book-btn')) {
        console.warn('ADD BOOK');
        addBookForm();
      }

      // TODO: CLICK EVENT EDITING/UPDATING A BOOK
      if (e.target.id.includes('edit-book-btn')) {
        console.warn('EDIT BOOK', e.target.id);
        console.warn(e.target.id.split('--'));
        const [, firebaseKey] = e.target.id.split('--');
        addBookForm(await getSingleBook(firebaseKey));
      }
      // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
      if (e.target.id.includes('view-book-btn')) {
        console.warn('VIEW BOOK', e.target.id);
        console.warn(e.target.id.split('--'));
        const [, firebaseKey] = e.target.id.split('--');
        const bookDetails = await getBookDetails(firebaseKey);
        viewBook(bookDetails);
      }

      // Event for Viewing author's page with all their books
      if (e.target.id.includes('view-author-btn')) {
        console.warn('VIEW AUTHOR');
        const [, firebaseKey] = e.target.id.split('--');
        console.warn(firebaseKey);
        const authorsBooks = await getAuthorBooks(firebaseKey);
        showAuthorsBooks(firebaseKey, authorsBooks);
      }

      // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
      if (e.target.id.includes('delete-author-btn')) {
        // eslint-disable-next-line no-alert
        if (window.confirm('Want to delete?')) {
          console.warn('DELETE AUTHOR', e.target.id);
          console.warn(e.target.id.split('--'));
          const [, firebaseKey] = e.target.id.split('--');
          deleteAuthorBooksRelationship(firebaseKey).then(() => {
            getAuthors(`${user.uid}`).then(showAuthors);
          });
        }
      }

      // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
      if (e.target.id.includes('add-author-btn')) {
        console.warn('ADD AUTHOR');
        addAuthorForm();
      }
      // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
      if (e.target.id.includes('update-author')) {
        console.warn('EDIT AUTHOR');
        const [, firebaseKey] = e.target.id.split('--');
        addAuthorForm(await getSingleAuthor(firebaseKey));
      }
      if (e.target.id.includes('star-button')) {
        console.warn('STAR AUTHOR');
        const [, firebaseKey] = e.target.id.split('--');
        const authorObject = await getSingleAuthor(firebaseKey);
        const favoriteAuthorPayload = {
          firebase: authorObject.firebase,
        };
        if (authorObject.favorite === true) {
          favoriteAuthorPayload.favorite = false;
          updateAuthor(favoriteAuthorPayload);
          getAuthors(`${user.uid}`).then(showAuthors);
        }
        favoriteAuthorPayload.favorite = true;
        updateAuthor(favoriteAuthorPayload);
        getAuthors(`${user.uid}`).then(showAuthors);
      }
    });
};

// const starEvent = (user) => {
//   document.querySelector('#store').addEventListener('click', async (e) => {
//     if (e.target.id.includes('star-button')) {
//       console.warn('STAR AUTHOR');
//       const [, firebaseKey] = e.target.id.split('--');
//       const authorObject = await getSingleAuthor(firebaseKey);
//       const favoriteAuthorPayload = {
//         firebase: authorObject.firebase,
//       };
//       if (authorObject.favorite === true) {
//         favoriteAuthorPayload.favorite = false;
//         updateAuthor(favoriteAuthorPayload);
//         getAuthors(`${user.uid}`).then(showAuthors);
//       }
//       favoriteAuthorPayload.favorite = true;
//       updateAuthor(favoriteAuthorPayload);
//       getAuthors(`${user.uid}`).then(showAuthors);
//     }
//   });
// };

export default domEvents
