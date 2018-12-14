import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    paddingHorizontal: 4,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 4,
    backgroundColor: 'purple',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 16,
    paddingLeft: 16
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  refreshText: {
    color: 'white',
    fontSize: 12,
    paddingRight: 12,
  },
  sectionView: {
    backgroundColor: 'white',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  rowItem: {
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 16
  },
  sectionTitle: {
    fontWeight: '600',
    color: 'black',
    padding: 16,
    fontSize: 16,
  },
  sectionEndView: {
    height: 5,
    backgroundColor: 'white',
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    marginBottom: 6,
  }
});
