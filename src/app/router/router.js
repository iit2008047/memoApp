import React from 'react';
import {Actions, Scene, Modal} from 'react-native-router-flux';
import MemoList from '../../pages/MemoList';
import EditMemo from '../../pages/EditMemo';
import Search from '../../pages/Search';

import routes from './routes';

const getScenes = () => Actions.create(
  <Scene key="root" hideNavBar>
    <Modal key="modal_root">
      <Scene key="pages_root" tabs={false} hideTabBar hideNavBar>
        <Scene key={routes.MEMO_LIST} initial component={MemoList} hideNavBar type={'reset'}/>
      </Scene>
      <Scene key={routes.EDIT_MEMO} component={EditMemo} hideTabBar hideNavBar/>
      <Scene key={routes.SEARCH_MEMO} component={Search} hideTabBar hideNavBar/>
    </Modal>
  </Scene>
)


export default getScenes;
