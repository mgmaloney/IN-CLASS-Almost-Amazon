import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyAuthors = () => {
  clearDom();
  const domString = `
    <h1>No Authors</h1>
    <button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>
  `;
  renderToDOM('#store', domString);
};

const showAuthors = (array) => {
  clearDom();

  const btnString =
    '<button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>';
  renderToDOM('#add-button', btnString);

  // checks for favorite and stars accordingly
  const favorited = (item) => {
    if (item.favorite === true) {
      return `
      <button type="button" class="btn btn-outline-secondary" id="star-button--${item.firebase}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
      </button>
      `;
    }
    return `
    <button type="button" class="btn btn-outline-secondary" id="star-button--${item.firebase}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-star"
        viewBox="0 0 16 16"
      >
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
      </svg>
    </button>
    `;
  };

  let domString = '';
  array.forEach((item) => {
    domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
        <hr>
        <i class="btn btn-success fas fa-eye" id="view-author-btn--${
          item.firebase
        }"></i>
        <i class="fas fa-edit btn btn-info" id="update-author--${
          item.firebase
        }"></i>
        <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${
          item.firebase
        }"></i>
        ${favorited(item)}
      </div>
    </div>
    `;
  });
  renderToDOM('#store', domString);
};

export { showAuthors, emptyAuthors };
