import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginHorizontal: 12,
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
  photoPicker: {
    height: 200,
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    borderRadius: 6,
  }
});
