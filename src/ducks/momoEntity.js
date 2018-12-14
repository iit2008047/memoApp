import _get from 'lodash/get';
import memoService from '../services/memo';
import {MEMO_LIST_ADDITION} from './memoList';

export const SAVE_MEMO_ENTITY = 'SAVE_MEMO_ENTITY';

export const ENTITY_DUCK_PATH = ['memoEntity'];

export default function (state = {}, action) {
  switch (action.type) {
    case SAVE_MEMO_ENTITY: {
      return Object.assign({}, state, {
        ...action.payload
      })
    }
    default:
      return state
  }
}

export function saveMemoEntity(profileById) {
  return {
    type: SAVE_MEMO_ENTITY,
    payload: profileById
  };
}

export const updateMemo = (memoItem) => (dispatch) => {

  memoService.updateMemoEntity(memoItem).then((response) => {
    console.log('response', response)
    dispatch(
      {
        type: SAVE_MEMO_ENTITY,
        payload: {
          [_get(memoItem, 'objectId')]: response
        }
      }
    );
  })

}


export const createMemo = (memoItem) => (dispatch) => {

  memoService.createMemo(memoItem).then((response) => {
    console.log('response', response)
    const memoId = _get(response, 'objectId');
    dispatch(
      {
        type: SAVE_MEMO_ENTITY,
        payload: {
          [memoId]: response
        }
      }
    );

    dispatch(
      {
        type: MEMO_LIST_ADDITION,
        payload: {
          memoItemId: memoId
        }
      }
    );
  })

}
