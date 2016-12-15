import { bind } from 'redux-effects';
import { fetch } from 'redux-effects-fetch';
import { createAction, handleActions } from 'redux-actions';
import { assignDefaults } from './utils/request';
const SET_KEYWORD = 'SET_KEYWORD';
const SET_VIDEO_LIST = 'SET_VIDEO_LIST';

export const INIT_SEARCH_STATE = {
  keyword: '',
  keywordSuggestion: [],
  searchVideoList: []
};

const setKeyword = createAction(SET_KEYWORD);

const fetchKeywordSuggestion = (keyword) => {

  const apiURL = `http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=${keyword}`;

  const fetchSuccess = ({value}) => {
    return (dispatch, getState) => {
      console.log(value);
    };
  };

  const fetchFail = (data) => {
    return (dispatch, getState) => {
      console.log(data)
    };
  };

  return bind(fetch(apiURL, {
    method: 'GET',
    mode: 'no-cors'
  }), fetchSuccess, fetchFail);
  /*fetch(apiURL,{'mode': 'no-cors'}, (response) => {
    console.log(response);
    if(response.status == 200) {
      console.log(response.body);
    }
  })*/
}

export const setSearchKeyword = (keyword) => {
  return (dispatch, getState) => {
    dispatch(setKeyword(keyword));
  }
}

const searchInputReducer = handleActions({

  SET_KEYWORD: (state, action) =>
    Object.assign({}, state, {
      keyword: action.payload
    })
}, INIT_SEARCH_STATE);

export default searchInputReducer;
