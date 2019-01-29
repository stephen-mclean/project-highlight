import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchBooks } from "../../actions";
import NewBookSearchResults from "./NewBookSearchResults";
import NewBookSearchForm from "./NewBookSearchForm";
import { ROUTES } from "../../constants";

class NewBookSearch extends Component {
  constructor(props) {
    super(props);

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.renderSearchForm = this.renderSearchForm.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.backToSearch = this.backToSearch.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);

    this.state = {
      // Initially show the search form
      shouldShowSearchForm: true
    };
  }

  cancelSearch() {
    this.props.history.push(`/${ROUTES.HOME}`);
  }

  componentDidUpdate() {
    console.log("book search update", this.props);
  }

  onSearchSubmit(values) {
    this.props.searchBooks(values);
    this.setState({ shouldShowSearchForm: false });
  }

  renderSearchForm() {
    return (
      <NewBookSearchForm
        cancelSearch={this.cancelSearch}
        onSearchSubmit={this.onSearchSubmit}
      />
    );
  }

  backToSearch() {
    this.setState({ shouldShowSearchForm: true });
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

NewBookSearch = withRouter(NewBookSearch);

NewBookSearch = connect(
  mapStateToProps,
  { searchBooks }
)(NewBookSearch);

export default NewBookSearch;
