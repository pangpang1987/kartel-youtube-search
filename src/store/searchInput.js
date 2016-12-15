import { bind } from 'redux-effects';
import { fetch } from 'redux-effects-fetch';
import { createAction, handleActions } from 'redux-actions';
import { assignDefaults } from './utils/request';
import { YOUTUBE_API_KEY } from 'config';

const SET_KEYWORD = 'SET_KEYWORD';
const SET_VIDEO_LIST = 'SET_VIDEO_LIST';

export const INIT_SEARCH_STATE = {
  keyword: '',
  searchVideoList: []
};

const setKeyword = createAction(SET_KEYWORD);
const setVideoList = createAction(SET_VIDEO_LIST);

const fetchVideoList = (keyword) => {
  const apiURL = 'https://www.googleapis.com/youtube/v3/search?' + 
    `&key=${YOUTUBE_API_KEY}` + 
    '&maxResults=50' +
    '&part=snippet' +
    '&type=video' +
    `&q=${keyword}`;

  const fetchSuccess = ({value}) => {
    return (dispatch, getState) => {
      dispatch(setVideoList(value.items))
    };
  };

  const fetchFail = (data) => {
    return (dispatch, getState) => {
      console.log(data)
    };
  };

  return bind(fetch(apiURL, {
    method: 'GET'
  }), fetchSuccess, fetchFail);
}

export const setSearchKeyword = (keyword) => {
  return (dispatch, getState) => {
    dispatch(setKeyword(keyword));
    dispatch(fetchVideoList(keyword));
  }
}

const searchInputReducer = handleActions({

  SET_KEYWORD: (state, action) =>
    Object.assign({}, state, {
      keyword: action.payload
    }),
  SET_VIDEO_LIST: (state, action) =>
    Object.assign({}, state, {
      searchVideoList: action.payload
    })
}, INIT_SEARCH_STATE);

export default searchInputReducer;
