import firebase from 'firebase';
import 'firebase/auth';
import { getAuthors } from '../../api/authorData';
import renderToDOM from '../../utils/renderToDom';

const selectAuthor = (authorId) => {
  let domString = `<label for="author">Select an Author</label>
    <select class="form-control" id="author_id" required>
    <option value="">Select an Author</option>`;
  getAuthors(`${firebase.auth().currentUser.uid}`).then((authorsArray) => {
    console.warn(authorsArray);
    authorsArray.forEach((author) => {
      console.warn(author);
      domString += `
          <option 
            id="authorFBKey"
            value="${author.firebase}" 
            ${authorId === author.firebaseKey ? 'selected' : ''}>
              ${author.first_name} ${author.last_name}
          </option>`;
    });

    domString += '</select>';

    renderToDOM('#select-author', domString);
  });
};

export default selectAuthor;
