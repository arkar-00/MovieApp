import React, { memo } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { BellIcon } from 'lucide-react-native'

const WIDTH = Dimensions.get('window').width

const Header = () => (
  <View style={styles.container}>
    <View style={styles.spacer} />
    <Image
      source={require('../../assets/icons/header-logo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
    <TouchableOpacity activeOpacity={0.7}>
      <BellIcon size={30} />
    </TouchableOpacity>
  </View>
)

export default memo(Header)

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spacer: {
    width: 30, // Ensures symmetry with BellIcon
  },
  logo: {
    width: WIDTH * 0.5,
    height: 80,
  },
})
