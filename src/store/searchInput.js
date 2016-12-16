import { bind } from 'redux-effects';
import { fetch } from 'redux-effects-fetch';
import { createAction, handleActions } from 'redux-actions';
import { assignDefaults } from './utils/request';
import { YOUTUBE_API_KEY } from 'config';

const SET_KEYWORD = 'SET_KEYWORD';
const SET_VIDEO_LIST = 'SET_VIDEO_LIST';
const SET_CATEGORIES_LIST = 'SET_CATEGORIES_LIST';
const SET_SEATCH_FILTER = 'SET_SEATCH_FILTER';
const RESET_SEARCH_FILTER = 'RESET_SEARCH_FILTER';
const SET_PAGE_TOKEN = 'SET_PAGE_TOKEN';

export const INIT_SEARCH_STATE = {
  filter: {
    category: '',
    year: ''
  },
  categoriesList: [],
  keyword: '',
  searchVideoList: [],
  pageToken: {
    prevPageToken: '',
    nextPageToken: ''
  }
};

const setKeyword = createAction(SET_KEYWORD);
const setVideoList = createAction(SET_VIDEO_LIST);
const setCategoriesList = createAction(SET_CATEGORIES_LIST);
const setSearchFilter = createAction(SET_SEATCH_FILTER);
const resetSearchFilter = createAction(RESET_SEARCH_FILTER);
const setPageToken = createAction(SET_PAGE_TOKEN);

export const fetchCategories = () => {
  const apiURL = 'https://www.googleapis.com/youtube/v3/videoCategories?' +
    `&key=${YOUTUBE_API_KEY}` +
    '&part=snippet' +
    '&regionCode=au';
  const fetchSuccess = ({value}) => {
    return (dispatch, getState) => {
      let categories = [];
      value.items.map(item => categories.push({value: item.id, label: item.snippet.title}));
      dispatch(setCategoriesList(categories));
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

const fetchVideoList = (keyword, filter, pageToken) => {

  let apiURL = 'https://www.googleapis.com/youtube/v3/search?' + 
    `&key=${YOUTUBE_API_KEY}` + 
    '&maxResults=50' +
    '&part=snippet' +
    '&type=video' +
    `&q=${keyword}`;

  if (keyword.trim().length === 0) {
    return setVideoList([]);
  }
  if (filter.year) {
    apiURL += `&publishedBefore=${filter.year + 1}-01-01T00:00:00Z`;
    apiURL += `&publishedAfter=${filter.year}-01-01T00:00:00Z`;
  }
  if (filter.category) {
    apiURL += `&videoCategoryId=${filter.category.value}`;
  }

  if (pageToken) {
    apiURL += `&pageToken=${pageToken}`;
  }

  const fetchSuccess = ({value}) => {
    return (dispatch, getState) => {
      dispatch(setPageToken({
        prevPageToken: value.prevPageToken,
        nextPageToken: value.nextPageToken
      }))
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

const processFetchVideoList = (pageToken) => {
  return (dispatch, getState) => {
    const { search: { keyword, filter } } = getState();
    dispatch(fetchVideoList(keyword, filter, pageToken));
  }
}

export const setSearchKeyword = (keyword) => {
  return (dispatch, getState) => {
    dispatch(setKeyword(keyword));
    dispatch(processFetchVideoList());
  }
}

export const setFilter = (changeFilter) => {
  return (dispatch, getState) => {
    const { search: { filter } } = getState();
    if (changeFilter && changeFilter.year && changeFilter.year === filter.year) {
      dispatch(setSearchFilter(changeFilter));
      return;
    }
    dispatch(setSearchFilter(changeFilter));
    dispatch(processFetchVideoList(changeFilter));
  }
}
export const resetFilter = () => {
  return (dispatch, getState) => {
    dispatch(resetSearchFilter());
    dispatch(processFetchVideoList());
  }
}
export const goToPage = (pageToken) => {
  return (dispatch, getState) => {
    dispatch(processFetchVideoList(pageToken));
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
    }),
  SET_CATEGORIES_LIST: (state, action) =>
    Object.assign({}, state, {
      categoriesList: action.payload
    }),
  SET_SEATCH_FILTER: (state, action) =>
    Object.assign({}, state, {
      filter: Object.assign({}, state.filter, action.payload)
    }),
  RESET_SEARCH_FILTER: (state, action) =>
    Object.assign({}, state, {
      filter: {
        category: '',
        year: ''
      }
    }),
  SET_PAGE_TOKEN: (state, action) =>
    Object.assign({}, state, {
      pageToken: action.payload
    })
}, INIT_SEARCH_STATE);

export default searchInputReducer;
