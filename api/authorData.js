import client from '../utils/client';
import { getBooks } from './bookData';

const endpoint = client.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });
// FIXME: CREATE AUTHOR
const createAuthor = (authorObj) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authorObj),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: GET SINGLE AUTHOR
const getSingleAuthor = (authorFBKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${authorFBKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (authorFirebaseId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${authorFirebaseId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(resolve(data)))
      .catch(reject);
  });

// FIXME: UPDATE AUTHOR
const updateAuthor = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = async (authorFBKey) => {
  const books = await getBooks();
  console.warn(books);
  const authorsBooks = [];
  books.forEach((book) => {
    if (book.author_id === authorFBKey) {
      console.warn(book);
      authorsBooks.push(book);
    }
  });
  console.warn(authorsBooks);
  return authorsBooks;
};

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
};
