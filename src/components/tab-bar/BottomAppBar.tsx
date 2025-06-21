import React, { memo, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { CommonActions } from '@react-navigation/native'
import TabBarItem from './TabBarItem'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { commonStyles } from '../../constants/styles'
import { CircleEllipsisIcon, HomeIcon, WalletIcon } from 'lucide-react-native'
import { SCREEN_NAMES } from '../../constants/base'

const TAB_CONFIG = [
  {
    name: SCREEN_NAMES.HOME,
    label: 'Home',
    Icon: HomeIcon,
  },
  {
    name: SCREEN_NAMES.WALLET,
    label: 'Wallet',
    Icon: WalletIcon,
  },
  {
    name: SCREEN_NAMES.MORE,
    label: 'More',
    Icon: CircleEllipsisIcon,
  },
]

const BottomAppBar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets()

  const handleTabPress = useCallback(
    (routeName: string, tabIndex: number) => {
      if (state.index !== tabIndex) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: routeName }],
          }),
        )
      }
    },
    [state.index, navigation],
  )

  return (
    <View
      style={[
        styles.container,
        commonStyles.appBar,
        { paddingBottom: insets.bottom },
      ]}
    >
      {TAB_CONFIG.map(({ name, label, Icon }, idx) => (
        <TabBarItem
          key={name}
          onPress={() => handleTabPress(name, idx)}
          isActive={state.index === idx}
          text={label}
          icon={<Icon size={state.index === idx ? 30 : 25} />}
          index={idx}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})

export default memo(BottomAppBar)
