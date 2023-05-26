// for merged promises
import { getSingleBook, deleteBook } from './bookData';
import {
  getSingleAuthor,
  getAuthorBooks,
  deleteSingleAuthor,
} from './authorData';

const getBookDetails = async (firebaseKey) => {
  const bookObject = await getSingleBook(firebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);
  return { ...bookObject, authorObject };
};

const deleteAuthorBooksRelationship = (firebaseKey) =>
  new Promise((resolve, reject) => {
    getAuthorBooks(firebaseKey)
      .then((authorBooksArr) => {
        const deleteBookPromises = authorBooksArr.map((book) =>
          deleteBook(book.firebaseKey)
        );

        deleteBookPromises.all(deleteBookPromises).then(() => {
          deleteSingleAuthor(firebaseKey).then(resolve);
        });
      })
      .then(reject);
  });

export { getBookDetails, deleteAuthorBooksRelationship };
