import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';
import { getBooks } from '../api/bookData';
import { showBooks, emptyBooks } from '../pages/books';

const startApp = (user) => {
  domBuilder(user); // BUILD THE DOM
  domEvents(user);
  // starEvent(user); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(user); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(user); // ATTACH THE EVENT LISTENERS TO THE NAVBAR
  getBooks(user.uid).then((books) => {
    if (books.length > 0) {
      getBooks(`${user.uid}`).then(showBooks);
    } else {
      emptyBooks();
    }
  });
  // TODO: Put all books on the DOM on App load
};

export default startApp;
