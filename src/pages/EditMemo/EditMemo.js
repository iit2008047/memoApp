import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  DatePickerIOS,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

import ImagePicker from 'react-native-image-picker';
import memoService from '../../services/memo';

import {popScene} from '../../utils/navigator';

import styles from './EditMemo.style';

const options = {
  title: 'Add Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class EditMemo extends React.Component {

  constructor(props) {
    super(props);

    const { title, description, with: attendy, image } = this.props.memoItem;

    console.log('-->item', this.props.memoItem);
    this.state = {
      memoItem: {
        title: title,
        description: description,
        with: attendy,
        image: image
      },
      photoUploader: {
        isUploading: false,
        imageData: ''
      },
      photoDownloader: {
        isDownloading: false,
        imageData: ''
      }
    };
  }

  componentDidMount() {
    const { image } = this.props.memoItem;
    if (!_isEmpty(image)) {

      this.setState({
        photoDownloader: {
          isDownloading: true
        }
      });
      memoService.getBase64EncodedDataFromUrl(image).then((response) => {
        this.setState({
          photoDownloader: {
            isDownloading: false,
            imageData: response
          }
        });
      })
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderToolBar()}
        {this.renderFields()}
      </SafeAreaView>
    )
  }


  renderToolBar = () => {
    return (

      <View style={styles.toolBar}>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => popScene()}>
          <Text style={styles.backButton}>{'Back'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => this.saveChanges()}>
          <Text style={styles.backButton}>{'Save'}</Text>
        </TouchableHighlight>
      </View>

    )
  }
  renderFields = () => {
    return (
      <ScrollView style={styles.container}>
        {this.renderTextInput('Title', this.state.memoItem.title, 'title')}
        {this.renderTextInput('Description', this.state.memoItem.description, 'description')}
        {this.renderTextInput('With', this.state.memoItem.with, 'with')}
        {this.renderImagePicker()}
      </ScrollView>
    )
  }

  renderTextInput = (label, value, key) => {
    return (
      <View style={styles.fieldView}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput
          style={styles.fieldValue}
          placeholder={`Enter ${label}`}
          onChangeText={(text) => this.onTextChangeName(key, text)}
          value={value}
          multiline
        />
      </View>
    )
  }

  renderImagePicker = () => {
    const { photoUploader, photoDownloader } = this.state
    const isLoading = photoUploader.isUploading || photoDownloader.isDownloading;
    const imageData = photoUploader.imageData || photoDownloader.imageData;

    return (
      <View style={styles.fieldView}>
        <Text style={styles.fieldLabel}>{'Add Photo to your memo'}</Text>

        {
          isLoading ?
            <View style={styles.photoPicker}>
              <ActivityIndicator size="small" color="grey"/>
            </View> : <View>
              {_isEmpty(imageData) ?
                <View style={styles.photoPicker}>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.onAddPhoto()}>
                    <Text style={styles.fieldValue}>{'Add Photo'}</Text>
                  </TouchableHighlight>
                </View> :
                <Image
                  source={{ uri: imageData }}
                  style={styles.photoPicker}
                />
              }
            </View>
        }


      </View>
    )
  }

  setDate = (key, value) => {
    console.log(key, value);
    this.setState({
      memoItem: {
        ...this.state.memoItem,
        [key]: value
      }
    });
  }

  onTextChangeName = (key, value) => {
    this.setState({
      memoItem: {
        ...this.state.memoItem,
        [key]: value
      }
    });
  }

  saveChanges = () => {
    const { updateMemo, createMemo, isEdit } = this.props;

    if (isEdit) {
      updateMemo({
          ...this.props.memoItem,
          ...this.state.memoItem,
        }
      )
    } else {
      createMemo({
          ...this.state.memoItem,
        }
      )
    }

    popScene();
  }


  onAddPhoto = () => {

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {

        this.setState({
          photoUploader: {
            isUploading: true,
          }
        });

        memoService.uploadImage(response.data, (new Date).getTime()).then((resp) => {
          const uploadedUrl = JSON.parse(resp).fileURL;
          this.setState((state) => {
            return {
              ...state,
              photoUploader: {
                isUploading: false,
                imageData: 'data:image/png;base64,' + response.data,
                uploadedUrl: uploadedUrl
              },
              memoItem: {
                ...state.memoItem,
                image: uploadedUrl
              }
            };
          });
        })
      }
    });

  }
}

