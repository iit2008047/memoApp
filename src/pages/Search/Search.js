import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import {
  Text,
  View,
  TextInput,
  DatePickerIOS,
  SectionList,
  ActivityIndicator,
  TouchableHighlight,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {popScene} from '../../utils/navigator';

import styles from "./Search.style";

export default class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      with: '',
      description: '',
      createdFrom: new Date(),
      createdTo: new Date(),
    };
  }


  render() {

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.sectionView}>
          {this.renderToolBar()}
          <ScrollView>
            {this.renderTextInput('With', this.state.with, 'with')}
            {this.renderTextInput('Contains', this.state.description, 'description')}
            {this.renderDatePicker('Created Between - FROM', this.state.createdFrom, 'createdFrom')}
            {this.renderDatePicker('Created Between - TO ', this.state.createdTo, 'createdTo')}
          </ScrollView>
        </View>
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
          onPress={() => this.applySearch()}>
          <Text style={styles.backButton}>{'Apply Search'}</Text>
        </TouchableHighlight>
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

  setDate = (key, value) => {
    console.log(key, value);
    this.setState({
      [key]: value
    });
  }

  onTextChangeName = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  applySearch = () => {
    const { with: people, description, createdFrom, createdTo } = this.state;
    let queryParam = `created>=${createdFrom.getTime()} AND created<=${createdTo.getTime()}`;
    if (!_isEmpty(people)) {
      queryParam = queryParam + `AND with LIKE \'${people}%\'`;
    }

    if (!_isEmpty(description)) {
      queryParam = queryParam + `AND description LIKE '%${description}%'`;
    }
    const { applySearch } = this.props;
    applySearch(`?where=${encodeURIComponent(queryParam)}`);
    popScene()
  }
}
