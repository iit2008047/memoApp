import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    backgroundColor: 'purple',
  },
  sectionView: {
    flex: 1,
    marginTop: 12,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    color: 'black',
    marginVertical: 8,
    fontSize: 14,
    marginBottom: 8,
  },
  fieldView: {
    marginTop: 12,
  },
  fieldValue: {
    color: '#0a0a14',
    marginVertical: 8,
    fontSize: 20,
    marginBottom: 8,
  },
  fieldLabel: {
    color: '#73737d',
    fontSize: 15,
  },
});
