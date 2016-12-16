import { bind } from 'redux-effects';
import { fetch } from 'redux-effects-fetch';
import { createAction, handleActions } from 'redux-actions';
import { assignDefaults } from './utils/request';
import { YOUTUBE_API_KEY } from 'config';

const ADD_TO_VIDEO_LIST = 'ADD_TO_VIDEO_LIST';
const ADD_TO_VIDEO_ID_LIST = 'ADD_TO_VIDEO_ID_LIST';
const REMOVE_FROM_VIDEO_LIST = 'REMOVE_FROM_VIDEO_LIST';
const REMOVE_FROM_VIDEO_ID_LIST = 'REMOVE_FROM_VIDEO_ID_LIST';

const addToVideoList = createAction(ADD_TO_VIDEO_LIST);
const addToVideoIdList = createAction(ADD_TO_VIDEO_ID_LIST);
const removeFromVideoList = createAction(REMOVE_FROM_VIDEO_LIST);
const removeFromVideoIdList = createAction(REMOVE_FROM_VIDEO_ID_LIST);

export const INIT_SAVE_STATE = {
  savedVideoList: [],
  savedVideoIdList: []
};

export const setSearchKeyword = (keyword) => {
  return (dispatch, getState) => {
    dispatch(setKeyword(keyword));
    dispatch(fetchVideoList(keyword));
  }
}
export const saveVideo = (video) => {
  return (dispatch, getState) => {
    dispatch(addToVideoList(video));
    dispatch(addToVideoIdList(video.id.videoId));
  }
}

export const unSaveVideo = (video) => {
  return (dispatch, getState) => {
    const {savedVideos:{savedVideoIdList}} = getState();
    const videoIdIndex = savedVideoIdList.indexOf(video.id.videoId);
    if (videoIdIndex === -1) {
      return;
    }
    dispatch(removeFromVideoList(videoIdIndex));
    dispatch(removeFromVideoIdList(videoIdIndex));
  }
}


const saveVideoReducer = handleActions({

  ADD_TO_VIDEO_LIST: (state, action) =>
    Object.assign({}, state, {
      savedVideoList: [...state.savedVideoList, action.payload]
    }),
  ADD_TO_VIDEO_ID_LIST: (state, action) =>
    Object.assign({}, state, {
      savedVideoIdList: [...state.savedVideoIdList, action.payload]
    }),
  REMOVE_FROM_VIDEO_LIST: (state, action) =>
    Object.assign({}, state, {
      savedVideoList: [
        ...state.savedVideoList.slice(0,action.payload),
        ...state.savedVideoList.slice(action.payload + 1)]
    }),
  REMOVE_FROM_VIDEO_ID_LIST: (state, action) =>
     Object.assign({}, state, {
      savedVideoIdList: [
        ...state.savedVideoIdList.slice(0,action.payload),
        ...state.savedVideoIdList.slice(action.payload + 1)]
    }),
}, INIT_SAVE_STATE);

export default saveVideoReducer;
