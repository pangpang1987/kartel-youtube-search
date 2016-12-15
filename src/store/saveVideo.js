import { bind } from 'redux-effects';
import { fetch } from 'redux-effects-fetch';
import { createAction, handleActions } from 'redux-actions';
import { assignDefaults } from './utils/request';
import { YOUTUBE_API_KEY } from 'config';

const SAVE_VIDEO = 'SAVE_VIDEO';

export const INIT_SAVE_STATE = {
  savedVideoList: []
};


export const saveVideo = createAction(SAVE_VIDEO);

const saveVideoReducer = handleActions({

  SAVE_VIDEO: (state, action) =>
    Object.assign({}, state, {
      savedVideoList: [...state.savedVideoList, action.payload]
    })
}, INIT_SAVE_STATE);

export default saveVideoReducer;
