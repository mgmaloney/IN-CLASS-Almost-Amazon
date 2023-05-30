import { createBook, getBooks, updateBook } from '../api/bookData';
import { createAuthor, getAuthors, updateAuthor } from '../api/authorData';
import { showBooks } from '../pages/books';
import { showAuthors } from '../pages/authors';

const formEvents = (user) => {
  document
    .querySelector('#main-container')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      // TODO: CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
      if (e.target.id.includes('submit-book')) {
        console.warn('CLICKED SUBMIT BOOK', e.target.id);
        const newBookPayload = {
          author_id: document.getElementById('authorFBKey').value,
          title: document.getElementById('title').value,
          description: document.getElementById('description').value,
          image: document.getElementById('image').value,
          price: document.getElementById('price').value,
          sale: document.getElementById('sale').checked,
          uid: `${user.uid}`,
        };
        console.warn(newBookPayload);
        createBook(newBookPayload).then(({ name }) => {
          const patchPayload = { firebase: name };
          updateBook(patchPayload).then(() => {
            getBooks(`${user.uid}`).then(showBooks);
          });
        });
      }

      // TODO: CLICK EVENT FOR EDITING A BOOK
      if (e.target.id.includes('update-book')) {
        const [, firebaseKey] = e.target.id.split('--');
        console.warn('CLICKED UPDATE BOOK', e.target.id);
        console.warn(firebaseKey);
        const updateBookPayload = {
          firebaseKey,
          author_id: document.getElementById('authorFBKey').value,
          title: document.getElementById('title').value,
          description: document.getElementById('description').value,
          image: document.getElementById('image').value,
          price: document.getElementById('price').value,
          sale: document.getElementById('sale').checked,
          uid: `${user.id}`,
        };
        updateBook(updateBookPayload).then(() => {
          getBooks(`${user.uid}`).then(showBooks);
        });
      }

      // FIXME: ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
      if (e.target.id.includes('submit-author')) {
        console.warn('CLICKED SUBMIT AUTHOR');
        const newAuthor = {
          email: document.getElementById('email').value,
          first_name: document.getElementById('first_name').value,
          last_name: document.getElementById('last_name').value,
          uid: `${user.uid}`,
        };
        createAuthor(newAuthor).then(({ name }) => {
          console.warn(name);
          const patchPayload = { firebase: name };
          updateAuthor(patchPayload).then(() => {
            getAuthors(`${user.uid}`).then(showAuthors);
          });
        });
      }
      // FIXME:ADD CLICK EVENT FOR EDITING AN AUTHOR});
      if (e.target.id.includes('update-author')) {
        const [, firebaseKey] = e.target.id.split('--');
        console.warn('CLICKED UPDATE AUTHOR', e.target.id);
        console.warn(firebaseKey);
        const updateAuthorPayload = {
          firebaseKey,
          email: document.getElementById('email').value,
          first_name: document.getElementById('first_name').value,
          last_name: document.getElementById('last_name').value,
          favorite: document.getElementById('favorite').checked,
        };
        updateAuthor(updateAuthorPayload).then(() => {
          getAuthors(`${user.uid}`).then(showAuthors);
        });
      }
    });
};

export default formEvents;
