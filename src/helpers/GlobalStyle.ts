import {StyleSheet} from 'react-native';

const globalStyle = StyleSheet.create({
  showBorder: {
    borderColor: 'black',
    borderWidth: 1,
  },
  fwBold: {
    fontWeight: 'bold',
  },
  hCenter: {
    alignItems: 'center',
  },
  vCenter: {
    justifyContent: 'center',
  },
  vhCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
});

export {globalStyle};
