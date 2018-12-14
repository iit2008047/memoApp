import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  DatePickerIOS,
  Image,
  ActivityIndicator
} from 'react-native';

import _isEmpty from 'lodash/isEmpty';
import ImagePicker from 'react-native-image-picker';
// import memoService from '../../services/memo'; // to fix upload

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

    const { title, description, with: attendy, created } = this.props.memoItem;

    this.state = {
      memoItem: {
        title: title,
        description: description,
        with: attendy,
        // created: new Date(created),
      },
      photoUploader: {
        isUploading: false,
        imageData: ''
      }
    };
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
      <View>
        {this.renderTextInput('Title', this.state.memoItem.title, 'title')}
        {this.renderTextInput('Description', this.state.memoItem.description, 'description')}
        {this.renderTextInput('With', this.state.memoItem.with, 'with')}
        {this.renderImagePicker()}
        {/*{this.renderDatePicker('Created On', this.state.memoItem.created, 'created')}*/}
      </View>
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
        />
      </View>
    )
  }

  renderDatePicker = (label, value, key) => {
    console.log(label, value)
    return (
      <View style={styles.fieldView}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <DatePickerIOS
          date={value}
          onDateChange={(date) => this.setDate(key, date)}
        />
      </View>
    )
  }

  renderImagePicker = () => {
    const { photoUploader } = this.state
    return (
      <View style={styles.fieldView}>
        <Text style={styles.fieldLabel}>{'Add Photo to your memo'}</Text>

        {
          photoUploader.isUploading ?
            <View style={styles.photoPicker}>
              <ActivityIndicator size="small" color="white"/>
            </View> : <View>
              {_isEmpty(photoUploader.imageData) ?
                <View style={styles.photoPicker}>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.onAddPhoto()}>
                    <Text style={styles.fieldValue}>{'Add Photo'}</Text>
                  </TouchableHighlight>
                </View> :
                <Image
                  source={{ uri: photoUploader.imageData }}
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
          // created: this.state.created.getTime()
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

        // fix this
        // memoService.uploadImage(response.data, (new Date).getTime()).then((response) => {
        //   console.log('---> image', response)
        // })

        setTimeout(() => {
          this.setState({
            photoUploader: {
              isUploading: false,
              imageData: 'data:image/jpeg;base64,' + response.data
            }
          });
        }, 1000)
      }
    });

  }
}

