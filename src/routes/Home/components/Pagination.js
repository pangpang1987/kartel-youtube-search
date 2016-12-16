import React, {
  Component,
  PropTypes
} from 'react';

export class Pagination extends Component {
  static propTypes = {
    pageToken: PropTypes.object.isRequired,
    goToPage: PropTypes.func.isRequired
  }

  goToPreviousPage = () => {
    const { pageToken, goToPage } = this.props;
    goToPage(pageToken.prevPageToken);
  }
  goToNextPage = () => {
    const { pageToken, goToPage } = this.props;
    goToPage(pageToken.nextPageToken);
  }

  render() {
    return (
      <nav>
        <ul className="pager">
          <li className={this.props.pageToken.prevPageToken ? "previous" : "previous disabled"}>
            <a onClick={this.goToPreviousPage}>Previous</a>
          </li>
          <li className={this.props.pageToken.nextPageToken ? "next" : "next disabled"}>
            <a onClick={this.goToNextPage}>Next</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;