import {combineReducers} from 'redux';

import memoList from '../ducks/memoList';
import memoEntity from '../ducks/momoEntity';

export default combineReducers({
  memoList,
  memoEntity
})
