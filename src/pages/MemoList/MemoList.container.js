import {connect} from 'react-redux';
import MemoList from './MemoList';

import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy'
import moment from 'moment';

import {fetchMemos, DUCK_PATH} from '../../ducks/memoList';
import {ENTITY_DUCK_PATH} from '../../ducks/momoEntity';
import {createSelector} from 'reselect';

const getMemoIds = state => _get(state, [...DUCK_PATH, 'memoList'], []);
const getMemoData = state => _get(state, [ENTITY_DUCK_PATH], {});

const makeProfilesFromIds = createSelector(
  [getMemoIds, getMemoData],
  (ids, memoItems) => {
    const { memoList, groupedByCreatedDate } = _reduce(ids, (result, id) => {
      const memo = _get(memoItems, `${id}`, {});

      const createdDate = moment.unix(memo.created / 1000).format("MMM-DD-YYYY");
      const groupedByCreatedDate = result.groupedByCreatedDate;
      if (groupedByCreatedDate[createdDate]) {
        groupedByCreatedDate[createdDate].data.push(memo)
      } else {
        groupedByCreatedDate[createdDate] = { data: [memo], created: memo.created }
      }

      return {
        memoList: result.memoList.concat(memo),
        groupedByCreatedDate
      };
    }, { memoList: [], groupedByCreatedDate: {} });

    const sortedGroupedMemo = _sortBy(groupedByCreatedDate, (item) => {
      return item.created;
    })
    return {
      memoList,
      groupedByCreatedDate: _map(sortedGroupedMemo, (item, keyItem) => {
        return {
          title: moment.unix(item.created / 1000).format("MMM-DD-YYYY"),
          data: _sortBy(item.data, (item) => {
            return item.created;
          })
        }
      })
    };
  }
);


const mapStateToProps = (state) => {
  const memoListState = _get(state, [DUCK_PATH]);
  const requestStatus = _get(memoListState, 'requestStatus');

  const { memoList, groupedByCreatedDate } = makeProfilesFromIds(state);
  return {
    fetchStatus: requestStatus,
    memoList: memoList,
    groupedByCreatedDate
  }


}

const mapDispatchToProps = dispatch => ({
  fetchMemos: (query) => dispatch(fetchMemos(query)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MemoList);

