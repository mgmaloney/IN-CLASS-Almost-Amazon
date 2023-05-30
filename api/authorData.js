import client from '../utils/client';
import { getBooks } from './bookData';

const endpoint = client.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
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
const createAuthor = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
const deleteSingleAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${firebaseKey}.json`, {
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
    fetch(`${endpoint}/authors/${payload.firebase}.json`, {
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
  const authorsBooks = [];
  books.forEach((book) => {
    if (book.author_id === authorFBKey) {
      authorsBooks.push(book);
    }
  });
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
