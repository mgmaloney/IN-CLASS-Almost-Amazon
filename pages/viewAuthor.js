import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { getSingleAuthor } from '../api/authorData';

const showAuthorsBooks = async (array) => {
  clearDom();
  console.warn(array);
  const author = await getSingleAuthor(array[0].author_id);

  const btnString =
    '<button class="btn btn-success btn-lg mb-4" id="add-book-btn">Add A Book</button>';
  renderToDOM('#add-button', btnString);

  const authorHeaderElement = `
  <h2>${author.first_name} ${author.last_name}</h2>
  <h2>Email: ${author.email}</h2>
  <h2 id="book-header">Books:<h2>
  `;
  renderToDOM('#view-author', authorHeaderElement);

  let domString = '';
  array.forEach((item) => {
    domString += `
        <div class="card">
          <img class="card-img-top" src=${item.image} alt=${
      item.title
    } style="height: 400px;">
          <div class="card-body" style="height: 180px;">
            <h5 class="card-title">${item.title}</h5>
              <p class="card-text bold">${
                item.sale
                  ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}`
                  : `$${item.price}`
              }</p>
              <hr>
              <i class="btn btn-success fas fa-eye" id="view-book-btn--${
                item.firebaseKey
              }"></i>
              <i id="edit-book-btn--${
                item.firebaseKey
              }" class="fas fa-edit btn btn-info"></i>
              <i id="delete-book-btn--${
                item.firebaseKey
              }" class="btn btn-danger fas fa-trash-alt"></i>
          </div>
        </div>`;
  });
  renderToDOM('#store', domString);
};

export default showAuthorsBooks;
