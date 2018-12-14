import _keyBy from 'lodash/keyBy';
import _get from 'lodash/get';

import requestStatus from '../constants/requestStatus';
import memoService from '../services/memo';

import {saveMemoEntity} from './momoEntity';


export const DUCK_PATH = ['memoList'];

export const MEMO_FETCH_SUCCESS = 'MEMO_FETCH_SUCCESS';
export const MEMO_FETCH_LOADING = 'MEMO_FETCH_LOADING';
export const MEMO_LIST_ADDITION = 'MEMO_LIST_ADDITION';
export const MEMO_FETCH_ERROR = 'MEMO_FETCH_ERROR';


export default function memoList(state = {
                                   requestStatus: requestStatus.unknown,
                                   items: []
                                 },
                                 action) {
  switch (action.type) {
    case MEMO_FETCH_ERROR:
      return Object.assign({}, state, {
        requestStatus: requestStatus.error,
        error: action.payload.error
      })
    case MEMO_FETCH_LOADING:
      return Object.assign({}, state, {
        requestStatus: requestStatus.inProgress,
        error: '',
      })
    case MEMO_FETCH_SUCCESS:
      return Object.assign({}, state, {
        requestStatus: requestStatus.success,
        error: '',
        memoList: action.payload.memoList,
      })
    case MEMO_LIST_ADDITION:
      const memoList = [ ...state.memoList, action.payload.memoItemId]
      console.log('---> state.memoList', state.memoList, memoList)
      return Object.assign({}, state, {
        memoList: memoList,
      })
    default:
      return state
  }
}


export const fetchMemos = () => (dispatch) => {

  dispatch(
    {
      type: MEMO_FETCH_LOADING,
    }
  );

  memoService.getMemoList().then((respose) => {

    let memoList = [];
    const memoById = _keyBy(respose, (item) => {
      const id = _get(item, 'objectId');
      memoList.push(id);
      return id;
    });

    dispatch(saveMemoEntity(memoById))
    dispatch(
      {
        type: MEMO_FETCH_SUCCESS,
        payload: {
          memoList: memoList
        },
      }
    );
  })
}
