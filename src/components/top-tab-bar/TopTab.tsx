import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { DIMENSIONS, FONT_SIZES, FONT_WEIGHTS } from '../../constants/base'
const { width: WIDTH } = Dimensions.get('window')

type Tab = {
  key: string
  label: string
}

type TopTabProps = {
  tabs: Tab[]
  activeTab: string
  onTabPress: (key: string) => void
}

const TopTab: React.FC<TopTabProps> = ({ tabs, activeTab, onTabPress }) => {
  const indicatorPosition = useSharedValue(
    tabs.findIndex((tab) => tab.key === activeTab),
  )

  React.useEffect(() => {
    const idx = tabs.findIndex((tab) => tab.key === activeTab)
    indicatorPosition.value = withTiming(idx, { duration: 250 })
  }, [activeTab, tabs, indicatorPosition])

  const tabWidth = 100 / tabs.length

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    left: `${indicatorPosition.value * tabWidth}%`,
  }))

  return (
    <View style={styles.tabContainer}>
      {/* Animated Background Indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: `${tabWidth}%`,
          },
          animatedIndicatorStyle,
        ]}
      />
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => onTabPress(tab.key)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default TopTab

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    position: 'relative',
    overflow: 'hidden',
    width: WIDTH * 0.7,
    alignSelf: 'center',
    marginBottom: DIMENSIONS.SPACING_MD,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    zIndex: 1,
  },
  tabText: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.NORMAL,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: '100%',
    backgroundColor: '#007AFF',
    zIndex: -1,
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
  },
})
