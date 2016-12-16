import React, {
  Component,
  PropTypes
} from 'react';
import './SearchInput.scss';
import JSONP from 'jsonp';
import ReactDOM from 'react-dom';

class SearchInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      isFilterOpen: false
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleBackgroundClick);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleBackgroundClick);
  }

  static propTypes = {
    keyword: PropTypes.string,
    setSearchKeyword: PropTypes.func
  }

  handleBackgroundClick = (event) => {
    const area = ReactDOM.findDOMNode(this.refs.dropdown);
    if (!area.contains(event.target)) {
      this.clearKeywordSuggestion();
    }
  }

  getKeywordSuggestion = (keyword) => {
    const _this = this;
    if (keyword && keyword.trim().length > 0) {
      const apiUrl = `http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=${keyword}`;
      JSONP(apiUrl, function(error, data) {
        if (error) {
          console.log(error);
        } else {
          const searchResults = data[1];
          _this.setState({
            suggestions: searchResults
          });
        }
      });
    } else {
      this.clearKeywordSuggestion();
    }    
  }

  handleChange = (event) => {
    const keyword = event.target.value;
    this.props.setSearchKeyword(keyword);
    this.getKeywordSuggestion(keyword);
  }
  handleFocus = (event) => {
    const keyword = event.target.value;
    this.getKeywordSuggestion(keyword);
  }

  handleFilterToggle = () => {
    this.setState({
      isFilterOpen: !this.state.isFilterOpen
    });
  }

  keywordSelect = (index) => {
    this.props.setSearchKeyword(this.state.suggestions[index][0]);
    this.clearKeywordSuggestion();
  }
  clearKeywordSuggestion = () => {
    this.setState({
      suggestions: []
    });
  }

  render() {
    const { keyword } = this.props;
    const { suggestions, isFilterOpen } = this.state;
    return (
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search"
          className="form-control search-input"
          value={keyword}
          onChange={this.handleChange}
          onFocus={this.handleFocus} />
        <div className="filter-button">
          <button onClick={this.handleFilterToggle}>
            <span className="glyphicon glyphicon-filter"></span>
            filter
          </button>
        </div>
        <div className="search-input-suggestion-wrapper" ref="dropdown">
          <ul className="suggestion-list">
            {suggestions.map((item, index) => {
              return (
                <li key={index} onClick={() => this.keywordSelect(index)}>
                  {item[0]}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="search-input-filter-wrapper" ref="filter">
          {
            isFilterOpen ? <div>something here</div> : null
          }
        </div>
      </div>
    );
  }
}

export default SearchInput;
