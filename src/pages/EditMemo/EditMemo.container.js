import {connect} from 'react-redux';
import EditMemo from './EditMemo';

import _get from 'lodash/get';

import {ENTITY_DUCK_PATH, updateMemo, createMemo} from '../../ducks/momoEntity';

const mapStateToProps = (state, ownProps) => {
  const profilesState = _get(state, [ENTITY_DUCK_PATH]);
  const memoId = _get(ownProps, 'memoItem.objectId')
  const memo = profilesState[memoId];

  return {
    memoItem: {
      ...memo,
    }
  }

}

const mapDispatchToProps = dispatch => ({
  updateMemo: (updatedMemo) => dispatch(updateMemo(updatedMemo)),
  createMemo: (memoObj) => dispatch(createMemo(memoObj)),

});


export default connect(mapStateToProps, mapDispatchToProps)(EditMemo);

