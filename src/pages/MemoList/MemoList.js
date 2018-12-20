import React from 'react';
import {Text, View, SectionList, ActivityIndicator, TouchableHighlight, SafeAreaView} from 'react-native';

import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import requestStatus from '../../constants/requestStatus';
import {navigate} from '../../utils/navigator';
import routes from '../../app/router/routes';

import styles from './MemoList.style';

export default class MemoList extends React.Component {

  componentDidMount() {
    this.props.fetchMemos()
  }

  render() {
    const { groupedByCreatedDate, fetchStatus } = this.props;

    if (fetchStatus === requestStatus.inProgress) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white"/>
        </SafeAreaView>
      )
    }

    if (_isEmpty(groupedByCreatedDate)) {
      return (
        <View>
          <Text style={styles.refreshText}>{'No Data Found'}</Text>
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <SectionList
          renderItem={this.renderRow}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={this.renderSectionTitle}
          sections={groupedByCreatedDate}
          keyExtractor={(item, index) => item.objectId}
          SectionSeparatorComponent={this.SectionSeparatorComponent}
        />
      </SafeAreaView>
    );
  }

  renderHeader = () => {
    return (
      <View style={styles.headerView}>
        <Text style={styles.headerText}>{'Here is how it looks '}</Text>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => this.onAddNew()}>
          <View>
            <Text style={styles.addNew}>{'Add New'}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => this.onSearchPress()}>
          <View>
            <Text style={styles.addNew}>{'Search Memo'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  SectionSeparatorComponent = (sections) => {
    const { trailingItem, trailingSection } = sections;
    if (trailingItem) {
      return null;
    }

    return (
      <View style={styles.sectionEndView}></View>
    )
  }

  renderRow = ({ item, index, section }) => {
    const createdDate = moment.unix(item.created / 1000).format("MMM-DD-YYYY HH:mm");
    return (
      <TouchableHighlight onPress={() => this.onProfilePress(item)}>
        <View style={styles.rowItem}>
          {this.renderProperty('Title', item.title)}
          {this.renderProperty('Description', item.description)}
          {this.renderProperty('With', item.with)}
          {this.renderProperty('Created Date Time', createdDate)}
        </View>
      </TouchableHighlight>
    )
  }

  renderProperty = (label, value) => {
    return (<Text style={styles.fieldView}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text>{' : '}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </Text>);
  }

  renderSectionTitle = ({ section }) => {
    const { title } = section;
    return (
      <View style={styles.sectionView}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    )
  }

  onProfilePress = (memoItem) => {
    navigate(routes.EDIT_MEMO, { memoItem, isEdit: true })
  }

  onRefreshPress = () => {
    this.props.fetchMemos()
  }

  onAddNew = () => {
    navigate(routes.EDIT_MEMO, {
      memoItem: {
        title: '',
        description: '',
        with: '',
        created: new Date(),
        image: ''
      },
      isEdit: false
    })
  }

  onSearchPress = () => {
    navigate(routes.SEARCH_MEMO, { applySearch: this.applySearch })
  }


  applySearch = (query) => {
    this.props.fetchMemos(query);
  }
}
