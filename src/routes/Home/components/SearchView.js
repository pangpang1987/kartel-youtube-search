import React, {
  Component,
  PropTypes
} from 'react';
import SearchInput from 'components/SearchInput';
import './SearchView.scss';

export class SearchView extends Component {



  render() {

    const {
      keyword,
      setSearchKeyword
    } = this.props;

    return (
      <div>
        <SearchInput keyword={keyword} setSearchKeyword={setSearchKeyword} />
      </div>
    );
  }
}

export default SearchView;
