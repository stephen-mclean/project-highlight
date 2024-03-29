import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getBooks, getEntries, removeBooks } from "../../actions";
import BookTile, { BookTileGrid } from "../../components/BookTile/BookTile";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import Button, {
  LINK_TYPE,
  DANGER_STYLE
} from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import { ROUTES } from "../../constants";

const BookTileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

class BooksComp extends Component {
  constructor(props) {
    super(props);

    this.props.getBooks();
    // Preload entries
    this.props.getEntries();

    this.renderBooks = this.renderBooks.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.markedForDeletion = this.markedForDeletion.bind(this);
    this.onDeleteBooks = this.onDeleteBooks.bind(this);
    this.hasBooksToDisplay = this.hasBooksToDisplay.bind(this);

    this.state = { editMode: false, booksToDelete: [] };
  }

  handleBookClick(book) {
    if (this.state.editMode) {
      this.toggleBookSelection(book);
    } else {
      this.props.history.push(`${ROUTES.BOOKS.path}/${book.id}`);
    }
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode,
      booksToDelete: []
    });
  }

  onDeleteBooks() {
    this.props.removeBooks(this.state.booksToDelete);
    this.setState({
      editMode: false,
      booksToDelete: []
    });
  }

  markedForDeletion(book) {
    const { booksToDelete } = this.state;
    return (
      booksToDelete.findIndex(
        markedForDeletion => markedForDeletion.id === book.id
      ) > -1
    );
  }

  toggleBookSelection(book) {
    const { booksToDelete } = this.state;

    const indexOfBook = booksToDelete.findIndex(
      markedForDeletion => markedForDeletion.id === book.id
    );
    if (indexOfBook > -1) {
      this.setState({
        booksToDelete: booksToDelete.filter((item, i) => indexOfBook !== i)
      });
    } else {
      this.setState({
        booksToDelete: [...booksToDelete, book]
      });
    }
  }

  hasBooksToDisplay() {
    return this.props.books.list && this.props.books.list.length > 0;
  }

  renderBooks() {
    return (
      <Fragment>
        {this.hasBooksToDisplay() && (
          <ButtonGroup right>
            {!this.state.editMode && (
              <ButtonGroup.Item>
                <Button
                  buttonType={LINK_TYPE}
                  onClick={this.toggleEditMode}
                  data-cy="books-edit-btn"
                >
                  Edit
                </Button>
              </ButtonGroup.Item>
            )}
            {this.state.editMode && (
              <ButtonGroup.Item>
                <Button
                  buttonType={LINK_TYPE}
                  onClick={this.toggleEditMode}
                  data-cy="books-cancel-edit-btn"
                >
                  Cancel
                </Button>
              </ButtonGroup.Item>
            )}
            {this.state.editMode && this.state.booksToDelete.length > 0 && (
              <ButtonGroup.Item>
                <Button
                  buttonType={LINK_TYPE}
                  buttonStyle={DANGER_STYLE}
                  onClick={this.onDeleteBooks}
                  data-cy="books-delete-btn"
                >
                  Delete
                </Button>
              </ButtonGroup.Item>
            )}
          </ButtonGroup>
        )}

        {this.hasBooksToDisplay() && (
          <BookTileGrid>
            {this.props.books.list.map((book, index) => (
              <BookTileContainer key={book.id} data-cy={`books-tile-${index}`}>
                <BookTile
                  {...book}
                  onClick={this.handleBookClick.bind(this, book)}
                />

                {this.state.editMode && (
                  <Checkbox
                    label="Select"
                    data-cy={`books-select-${index}`}
                    input={{
                      checked: this.markedForDeletion(book),
                      onChange: this.toggleBookSelection.bind(this, book)
                    }}
                  />
                )}
              </BookTileContainer>
            ))}
          </BookTileGrid>
        )}

        {(!this.props.books.list || !this.props.books.list.length) && (
          <Fragment>NO BOOKS</Fragment>
        )}
      </Fragment>
    );
  }

  render() {
    const { getBooks } = this.props;
    return (
      <ContentLoader
        loading={this.props.books.loading}
        error={this.props.books.error}
        onLoad={this.renderBooks}
        onRetry={getBooks}
      />
    );
  }
}

const mapStateToProps = ({ books }) => {
  return {
    books: {
      ...books,
      list: books.list
        ? books.list.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }

            return 0;
          })
        : []
    }
  };
};

export const Books = connect(
  mapStateToProps,
  { getBooks, getEntries, removeBooks }
)(BooksComp);
