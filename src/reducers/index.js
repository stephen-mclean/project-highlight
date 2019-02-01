import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import books from "./books";
import entries from "./entries";
import bookSearch from "./booksearch";
import newEntry from "./newentry";

export default combineReducers({
  auth,
  books,
  entries,
  bookSearch,
  newEntry,
  form: formReducer
});
