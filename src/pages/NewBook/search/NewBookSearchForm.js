import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import Input from "../../../components/Input/Input";
import Button, {
  ACCENT_STYLE,
  OUTLINE_TYPE
} from "../../../components/Button/Button";
import ButtonGroup from "../../../components/ButtonGroup/ButtonGroup";

class NewBookSearchForm extends Component {
  render() {
    const { handleSubmit, invalid, submitting, pristine } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.onSearchSubmit)}>
        <Field
          name="title"
          label="Title"
          type="text"
          component={Input}
          data-cy="book-search-title"
        />
        <Field
          name="author"
          label="Author"
          type="text"
          component={Input}
          data-cy="book-search-author"
        />
        <Field
          name="isbn"
          label="ISBN"
          type="text"
          component={Input}
          data-cy="book-search-isbn"
        />
        <ButtonGroup right>
          <ButtonGroup.Item>
            <Button
              type="button"
              buttonType={OUTLINE_TYPE}
              onClick={this.props.cancelSearch}
            >
              Cancel
            </Button>
          </ButtonGroup.Item>

          <ButtonGroup.Item>
            <Button
              buttonType={OUTLINE_TYPE}
              buttonStyle={ACCENT_STYLE}
              type="submit"
              data-cy="book-search-submit"
              disabled={invalid || submitting || pristine}
            >
              Search
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>
      </form>
    );
  }
}

NewBookSearchForm.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  cancelSearch: PropTypes.func.isRequired
};

export default reduxForm({
  form: "booksearch",
  validate: values => {
    const errors = {};
    if (!values.title && !values.author && !values.isbn) {
      const error = "Please enter either an author, title, or ISBN";
      errors.title = error;
      errors.author = error;
      errors.isbn = error;
    }

    return errors;
  }
})(NewBookSearchForm);
