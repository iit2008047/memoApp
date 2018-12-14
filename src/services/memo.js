import _property from 'lodash/property';
import apiClient from '../app/apiClient'

const BASE_URL = 'https://api.backendless.com/948FE494-CBB7-8015-FF6A-F62A9870BE00/10436E49-F445-C957-FFBC-85477448F400/'

const getData = _property('data');

const getMemoList = () => {
  return apiClient.get(BASE_URL + 'data/memo').then(getData);
}

const updateMemoEntity = (memoItem) => {
  return apiClient.put(BASE_URL + `data/memo/${memoItem.objectId}`, memoItem).then(getData);
}

const createMemo = (memoItem) => {
  return apiClient.post(BASE_URL + `data/memo`, memoItem).then(getData);
}

const uploadImage = (imageData, imageName) => {
  const formData = new FormData();
  formData.append('data', imageData)
  formData.append('filename', imageName)
  formData.append('name', imageName)

  const headers = {
    'content-type': 'multipart/form-data'
  }
  return apiClient.post(BASE_URL + `files/memo_images/${imageName}`, formData, headers).then(getData);
}
export default {
  getMemoList,
  updateMemoEntity,
  createMemo,
  uploadImage
}
