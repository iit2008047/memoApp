import _property from 'lodash/property';
import apiClient from '../app/apiClient';
import RNFetchBlob from 'rn-fetch-blob';

const BASE_URL = 'https://api.backendless.com/948FE494-CBB7-8015-FF6A-F62A9870BE00/10436E49-F445-C957-FFBC-85477448F400/'

const getData = _property('data');

const getMemoList = (query = '') => {
  return apiClient.get(BASE_URL + `data/memo${query}`).then(getData);
}

const updateMemoEntity = (memoItem) => {
  return apiClient.put(BASE_URL + `data/memo/${memoItem.objectId}`, memoItem).then(getData);
}

const createMemo = (memoItem) => {
  return apiClient.post(BASE_URL + `data/memo`, memoItem).then(getData);
}

const uploadImage = (imageData, imageName) => {

  return RNFetchBlob.fetch('POST', BASE_URL + `files/memo_images/${imageName}`, {
    'Content-Type': 'multipart/form-data'
  }, [
    { name: imageName, filename: imageName, data: RNFetchBlob.base64.encode(imageData) },
  ])
}
export default {
  getMemoList,
  updateMemoEntity,
  createMemo,
  uploadImage
}
