import { Platform } from 'react-native'

export const commonStyles = {
  appBar: {
    backgroundColor: '#fff',
    shadowColor: Platform.OS == 'ios' ? '#00000066' : '#000',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 3.49,
    elevation: 16,
  },
}
