// for merged promises
import { getSingleBook } from './bookData';
import { getSingleAuthor } from './authorData';

const getBookDetails = async (firebaseKey) => {
  const bookObject = await getSingleBook(firebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);
  return { ...bookObject, authorObject };
};

export default getBookDetails;
