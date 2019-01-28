import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { searchBooks } from "../../actions";
import Input from "../../components/Input/Input";
import Button, {
  DEFAULT_STYLE,
  ACCENT_STYLE,
  OUTLINE_TYPE
} from "../../components/Button/Button";
import NewBookSearchResults from "./NewBookSearchResults";

class NewBookSearch extends Component {
  constructor(props) {
    super(props);

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.renderSearchForm = this.renderSearchForm.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.renderSearchResultsList = this.renderSearchResultsList.bind(this);
    this.backToSearch = this.backToSearch.bind(this);

    this.state = {
      // Initially show the search form
      shouldShowSearchForm: true
    };
  }

  componentDidUpdate() {
    console.log("book search update", this.props);
  }

  onSearchSubmit(values) {
    this.props.searchBooks(values);
    this.setState({ shouldShowSearchForm: false });
  }

  renderSearchForm() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSearchSubmit)}>
        <Field name="title" label="Title" type="text" component={Input} />
        <Field name="author" label="Author" type="text" component={Input} />
        <Field name="isbn" label="ISBN" type="text" component={Input} />
        <button type="submit">Submit</button>
      </form>
    );
  }

  backToSearch() {
    this.setState({ shouldShowSearchForm: true });
  }

  renderSearchResultsList() {
    const { bookSearch } = this.props;
    if (bookSearch.results && bookSearch.results.length) {
      return (
        <Fragment>
          {bookSearch.results.map(result => {
            return (
              <BookSummary
                key={result.gBooksID}
                {...result}
                showDescription={false}
              />
            );
          })}
        </Fragment>
      );
    }

    return <Fragment>NO RESULTS</Fragment>;
  }

  renderSearchResults() {
    return (
      <NewBookSearchResults
        search={this.props.bookSearch}
        backToSearch={this.backToSearch}
        onAddBook={this.props.onAddBook}
      />
    );
  }

  render() {
    return (
      <Fragment>
        {this.state.shouldShowSearchForm && this.renderSearchForm()}
        {!this.state.shouldShowSearchForm && this.renderSearchResults()}
      </Fragment>
    );
  }
}

NewBookSearch.propTypes = {
  onAddBook: PropTypes.func.isRequired
};

const mapStateToProps = ({ bookSearch }) => {
  return { bookSearch };
};

NewBookSearch = connect(
  mapStateToProps,
  { searchBooks }
)(NewBookSearch);

export default reduxForm({
  form: "booksearch"
})(NewBookSearch);
