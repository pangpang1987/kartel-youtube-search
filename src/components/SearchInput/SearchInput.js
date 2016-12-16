import React, {
  Component,
  PropTypes
} from 'react';
import './SearchInput.scss';
import './Slider.scss';
import './Dropdown.css';
import JSONP from 'jsonp';
import ReactDOM from 'react-dom';
import Dropdown from 'react-dropdown';
import Slider from 'react-rangeslider';

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
    categoriesList: PropTypes.array,
    setSearchKeyword: PropTypes.func,
    filter: PropTypes.object.isRequired,
    setFilter: PropTypes.func,
    resetFilter: PropTypes.func
  }

  handleBackgroundClick = (event) => {
    const dropdown = ReactDOM.findDOMNode(this.refs.dropdown);
    if (!dropdown.contains(event.target)) {
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
  handleCategorySelect = (value) => {
    this.props.setFilter({
      category: value
    });
  }
  handleYearChange = (value) => {
    this.props.setFilter({
      year: value
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
    const { keyword, categoriesList, filter } = this.props;
    const { suggestions, isFilterOpen } = this.state;
    return (
      <div className="search-input-wrapper">
        <input
          autoFocus
          type="text"
          placeholder="Search youtube"
          className="form-control search-input"
          value={keyword}
          onChange={this.handleChange}
          onFocus={this.handleFocus} />
        <div className="filter-button">
          <button onClick={this.handleFilterToggle}>
            <span className="glyphicon glyphicon-filter"></span>
            { isFilterOpen ? 'Close filter' : 'filter' }
          </button>
        </div>
        <div className="search-input-dropdown" ref="dropdown">
          <ul className="suggestion-list">
            {suggestions.map((item, index) =>
              <li key={index} onClick={() => this.keywordSelect(index)}>
                {item[0]}
              </li>
            )}
          </ul>
        </div>
        <div className="search-input-dropdown" ref="filter">
          {
            isFilterOpen ? 
            <div className="filter-wrapper">
              <button className="clear-filter pull-right" onClick={this.props.resetFilter}>
                Clear filter
              </button>
              <div className="filter-section">
                <div className="filter-title">
                  Category
                </div>
                <Dropdown
                  options={categoriesList}
                  onChange={this.handleCategorySelect}
                  value={filter.category}
                  placeholder="Select an option" />
              </div>
              <div className="filter-section">
                <div className="filter-title">
                  Year
                  {' '}
                  <span className="filter-content">{filter.year}</span>
                </div>
                <Slider onChange={this.handleYearChange} min={2005} max={2016} value={isNaN(filter.year) ? 0 : filter.year} />
              </div>
            </div> : null
          }
        </div>
      </div>
    );
  }
}

export default SearchInput;
