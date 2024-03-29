import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Button, {
  DEFAULT_STYLE,
  OUTLINE_TYPE,
  ACCENT_STYLE
} from "../../../components/Button/Button";
import ButtonGroup from "../../../components/ButtonGroup/ButtonGroup";
import ContentLoader from "../../../components/ContentLoader/ContentLoader";
import BookSummary from "../../../components/BookSummary/BookSummary";

const SearchResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchResultIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors.foreground.default};
  font-size: 1rem;
`;

class NewBookSearchResults extends Component {
  constructor(props) {
    super(props);

    this.renderSearchResultsList = this.renderSearchResultsList.bind(this);
    this.backToSearchResultsList = this.backToSearchResultsList.bind(this);
    this.renderAllResults = this.renderAllResults.bind(this);
    this.renderIndividualResult = this.renderIndividualResult.bind(this);

    this.state = {
      individualResult: null
    };
  }

  viewIndividualResult(result) {
    console.log("result", result);
    this.setState({ individualResult: result });
  }

  backToSearchResultsList() {
    this.setState({ individualResult: null });
  }

  renderSearchResultsList() {
    const { search } = this.props;
    if (search.results && search.results.length) {
      return (
        <Fragment>
          {search.results.map((result, index) => {
            return (
              <SearchResultContainer
                key={result.gBooksID || result.id}
                data-cy={`new-book-search-result-${index}`}
                onClick={this.viewIndividualResult.bind(this, result)}
              >
                <BookSummary {...result} showDescription={false} />
                <SearchResultIcon icon="chevron-right" />
              </SearchResultContainer>
            );
          })}

          {!this.props.hideBackToSearch && (
            <ButtonGroup right>
              <ButtonGroup.Item>
                <Button
                  buttonType={OUTLINE_TYPE}
                  buttonStyle={DEFAULT_STYLE}
                  onClick={this.props.backToSearch}
                >
                  Back
                </Button>
              </ButtonGroup.Item>
            </ButtonGroup>
          )}
        </Fragment>
      );
    }

    return <Fragment>NO RESULTS</Fragment>;
  }

  renderAllResults() {
    const { retrySearch } = this.props;
    return (
      <Fragment>
        <ContentLoader
          loading={this.props.search.loading}
          error={this.props.search.error}
          onLoad={this.renderSearchResultsList}
          onRetry={retrySearch}
        />
      </Fragment>
    );
  }

  renderIndividualResult() {
    const { newBookLoading } = this.props.newBook;
    return (
      <Fragment>
        <BookSummary {...this.state.individualResult} />

        <ButtonGroup right>
          <ButtonGroup.Item>
            <Button
              buttonType={OUTLINE_TYPE}
              buttonStyle={DEFAULT_STYLE}
              onClick={this.backToSearchResultsList}
            >
              Back
            </Button>
          </ButtonGroup.Item>

          <ButtonGroup.Item>
            <Button
              buttonType={OUTLINE_TYPE}
              buttonStyle={ACCENT_STYLE}
              onClick={() => this.props.onAddBook(this.state.individualResult)}
              data-cy="new-book-search-result-individual-result-add-btn"
            >
              {newBookLoading && <FontAwesomeIcon icon="spinner" spin />}
              {!newBookLoading && "Add Book"}
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>
      </Fragment>
    );
  }

  render() {
    if (this.state.individualResult) {
      return this.renderIndividualResult();
    }
    return this.renderAllResults();
  }
}

NewBookSearchResults.propTypes = {
  search: PropTypes.object.isRequired,
  backToSearch: PropTypes.func,
  hideBackToSearch: PropTypes.bool,
  onAddBook: PropTypes.func.isRequired,
  retrySearch: PropTypes.func.isRequired
};

NewBookSearchResults.defaultProps = {
  hideBackToSearch: false,
  backToSearch: () => {}
};

const mapStateToProps = ({ newBook }) => {
  return { newBook };
};

NewBookSearchResults = connect(
  mapStateToProps,
  null
)(NewBookSearchResults);

export default NewBookSearchResults;
